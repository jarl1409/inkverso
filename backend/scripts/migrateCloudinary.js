const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuración de Cloudinary (ajustada para ejecutar desde scripts/)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function migrarUploads() {
  const uploadsDir = './uploads'; // Ajusta si tu carpeta está en otra ubicación
  const resultados = [];
  const errores = [];
  
      console.log('🚀 Iniciando migración de uploads a Cloudinary (carpeta Libros/)...\n');
  
  try {
    const archivos = fs.readdirSync(uploadsDir);
    const imagenesEncontradas = archivos.filter(archivo => esImagen(archivo));
    
    console.log(`📊 Encontradas ${imagenesEncontradas.length} imágenes para migrar\n`);
    
    let contador = 0;
    
    for (const archivo of imagenesEncontradas) {
      contador++;
      const rutaCompleta = path.join(uploadsDir, archivo);
      
      try {
        console.log(`[${contador}/${imagenesEncontradas.length}] Procesando: ${archivo}`);
        
        // Usar el mismo patrón de nombre que ya tienes
        const timestamp = extraerTimestamp(archivo);
        const nombreLimpio = limpiarNombre(archivo);
        
        const resultado = await cloudinary.uploader.upload(rutaCompleta, {
          // Usar patrón similar a tu middleware actual
          public_id: `migrated-${timestamp || Date.now()}-${nombreLimpio}`,
          folder: 'Libros', // Misma carpeta que tu middleware actual
          resource_type: 'image',
          
          // Aplicar las mismas transformaciones que tu middleware
          transformation: [
            {
              width: 400,
              height: 600,
              crop: 'fill',
              quality: 'auto',
              format: 'webp'
            }
          ],
          
          // Añadir contexto para búsqueda posterior
          context: {
            filename: archivo,
            timestamp: timestamp || 'unknown',
            migrated_from: 'local_uploads',
            original_path: rutaCompleta
          },
          
          // Tags para distinguir de las nuevas
          tags: ['migrated', 'legacy-uploads'],
          
          // Formato optimizado como en tu middleware
          format: 'webp'
        });
        
        resultados.push({
          archivoOriginal: archivo,
          rutaLocal: rutaCompleta,
          public_id: resultado.public_id,
          url: resultado.secure_url,
          cloudinary_url: resultado.url,
          bytes: resultado.bytes,
          format: resultado.format,
          width: resultado.width,
          height: resultado.height
        });
        
        console.log(`   ✅ Subido: ${resultado.secure_url}`);
        console.log(`   📏 Dimensiones: ${resultado.width}x${resultado.height}`);
        console.log(`   💾 Tamaño: ${(resultado.bytes / 1024).toFixed(2)} KB\n`);
        
        // Pequeña pausa para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`   ❌ Error con ${archivo}:`, error.message);
        errores.push({ archivo, error: error.message });
      }
    }
    
    // Generar archivos de resultado
    generarReportes(resultados, errores);
    
  } catch (error) {
    console.error('Error leyendo directorio uploads:', error);
  }
}

function esImagen(archivo) {
  const extensiones = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'];
  return extensiones.some(ext => archivo.toLowerCase().endsWith(ext));
}

function extraerTimestamp(nombreArchivo) {
  // Buscar patrón de timestamp en tus nombres de archivo
  const match = nombreArchivo.match(/(\d{13})/); // 13 dígitos = timestamp en milisegundos
  return match ? match[1] : null;
}

function limpiarNombre(nombreArchivo) {
  // Remover timestamp y caracteres especiales, mantener nombre descriptivo
  return nombreArchivo
    .replace(/^\d{13}-/, '') // Remover timestamp del inicio
    .replace(/\.[^/.]+$/, '') // Remover extensión
    .replace(/[^a-zA-Z0-9-]/g, '-'); // Limpiar caracteres especiales
}

function generarReportes(resultados, errores) {
  // Archivo de mapeo para referencia
  const mapeo = {};
  resultados.forEach(r => {
    mapeo[r.archivoOriginal] = {
      local_path: r.rutaLocal,
      cloudinary_url: r.url,
      secure_url: r.url,
      public_id: r.public_id,
      dimensions: `${r.width}x${r.height}`,
      size_kb: Math.round(r.bytes / 1024)
    };
  });
  
  fs.writeFileSync('mapeo_uploads_cloudinary.json', JSON.stringify(mapeo, null, 2));
  
  // Reporte de migración
  const reporte = {
    fecha_migracion: new Date().toISOString(),
    total_archivos: resultados.length,
    exitosos: resultados.length,
    errores: errores.length,
    detalles_exitosos: resultados,
    detalles_errores: errores,
    estadisticas: {
      tamaño_total_kb: resultados.reduce((sum, r) => sum + r.bytes, 0) / 1024,
      formatos: [...new Set(resultados.map(r => r.format))]
    }
  };
  
  fs.writeFileSync('reporte_migracion_uploads.json', JSON.stringify(reporte, null, 2));
  
  // Script SQL para actualizar referencias (si usas base de datos)
  generarScriptSQL(mapeo);
  
  // Resumen final
  console.log('\n' + '='.repeat(50));
  console.log('📋 RESUMEN DE MIGRACIÓN');
  console.log('='.repeat(50));
  console.log(`✅ Imágenes migradas exitosamente: ${resultados.length}`);
  console.log(`❌ Errores: ${errores.length}`);
  console.log(`📁 Archivos generados:`);
  console.log(`   • mapeo_uploads_cloudinary.json`);
  console.log(`   • reporte_migracion_uploads.json`);
  console.log(`   • update_database.sql`);
  console.log(`💾 Tamaño total: ${(reporte.estadisticas.tamaño_total_kb / 1024).toFixed(2)} MB`);
  console.log('='.repeat(50));
  
  if (errores.length > 0) {
    console.log('\n⚠️  ERRORES ENCONTRADOS:');
    errores.forEach(e => console.log(`   • ${e.archivo}: ${e.error}`));
  }
}

function generarScriptSQL(mapeo) {
  let sql = '-- Script para actualizar URLs en base de datos\n\n';
  sql += '-- BACKUP: Crear respaldo antes de ejecutar\n';
  sql += '-- CREATE TABLE libros_backup AS SELECT * FROM libros;\n\n';
  
  Object.entries(mapeo).forEach(([archivo, datos]) => {
    // Actualizar tabla de libros donde la imagenURL contenga el nombre del archivo
    sql += `UPDATE libros SET imagenURL = '${datos.secure_url}' WHERE imagenURL LIKE '%${archivo}%';\n`;
  });
  
  sql += '\n-- Verificar actualizaciones\n';
  sql += '-- SELECT titulo, imagenURL FROM libros WHERE imagenURL LIKE \'%cloudinary%\';\n';
  
  fs.writeFileSync('update_database.sql', sql);
}

// Función para verificar configuración
function verificarConfiguracion() {
  const requeridos = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const faltantes = requeridos.filter(key => !process.env[key]);
  
  if (faltantes.length > 0) {
    console.error('❌ Faltan variables de entorno:');
    faltantes.forEach(key => console.error(`   • ${key}`));
    console.error('\nConfigúralas en tu archivo .env');
    return false;
  }
  
  console.log('✅ Configuración de Cloudinary verificada');
  return true;
}

// Ejecutar migración
async function main() {
  console.log('🔍 Verificando configuración...');
  
  if (!verificarConfiguracion()) {
    process.exit(1);
  }
  
  // Verificar que existe la carpeta uploads
  if (!fs.existsSync('./uploads')) {
    console.error('❌ No se encontró la carpeta ./uploads');
    console.log('💡 Ejecuta este script desde la carpeta backend/scripts/');
    process.exit(1);
  }
  
  await migrarUploads();
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { migrarUploads, verificarConfiguracion };