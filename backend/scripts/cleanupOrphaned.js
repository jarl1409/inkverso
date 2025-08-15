const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Esquema del Libro
const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagenURL: { type: String },
  categoria: { type: String },
});

const Libro = mongoose.model('Libro', LibroSchema);

async function identificarImagenesHuerfanas() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conectado a MongoDB');

    // 1. Obtener todas las imágenes de la carpeta Libros en Cloudinary
    console.log('🔍 Obteniendo imágenes de Cloudinary...');
    
    let todasLasImagenes = [];
    let cursor = null;
    
    do {
      const resultado = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'Libros/',
        max_results: 500,
        next_cursor: cursor
      });
      
      todasLasImagenes = todasLasImagenes.concat(resultado.resources);
      cursor = resultado.next_cursor;
      
      console.log(`   📊 Encontradas ${todasLasImagenes.length} imágenes hasta ahora...`);
      
    } while (cursor);
    
    console.log(`📊 Total de imágenes en Cloudinary: ${todasLasImagenes.length}`);

    // 2. Obtener todas las URLs de imágenes que están en la base de datos
    console.log('🔍 Obteniendo URLs de la base de datos...');
    
    const librosConImagenes = await Libro.find({ 
      imagenURL: { $exists: true, $ne: '', $regex: 'cloudinary' } 
    }).select('titulo imagenURL');
    
    const urlsEnDB = new Set(librosConImagenes.map(libro => libro.imagenURL));
    console.log(`📊 URLs en base de datos: ${urlsEnDB.size}`);

    // 3. Identificar imágenes huérfanas
    const imagenesHuerfanas = [];
    const imagenesEnUso = [];
    
    for (const imagen of todasLasImagenes) {
      const urlCompleta = imagen.secure_url;
      
      if (urlsEnDB.has(urlCompleta)) {
        imagenesEnUso.push({
          public_id: imagen.public_id,
          url: urlCompleta,
          bytes: imagen.bytes,
          created_at: imagen.created_at
        });
      } else {
        imagenesHuerfanas.push({
          public_id: imagen.public_id,
          url: urlCompleta,
          bytes: imagen.bytes,
          created_at: imagen.created_at,
          folder: imagen.folder
        });
      }
    }

    // 4. Generar reporte
    const reporte = {
      fecha_analisis: new Date().toISOString(),
      total_imagenes_cloudinary: todasLasImagenes.length,
      imagenes_en_uso: imagenesEnUso.length,
      imagenes_huerfanas: imagenesHuerfanas.length,
      espacio_total_mb: (todasLasImagenes.reduce((sum, img) => sum + img.bytes, 0) / 1024 / 1024).toFixed(2),
      espacio_huerfanas_mb: (imagenesHuerfanas.reduce((sum, img) => sum + img.bytes, 0) / 1024 / 1024).toFixed(2),
      detalles_imagenes_huerfanas: imagenesHuerfanas,
      detalles_imagenes_en_uso: imagenesEnUso
    };

    // 5. Guardar reportes
    fs.writeFileSync('reporte_imagenes_huerfanas.json', JSON.stringify(reporte, null, 2));
    
    // Lista simple de public_ids para eliminar
    const publicIdsHuerfanas = imagenesHuerfanas.map(img => img.public_id);
    fs.writeFileSync('imagenes_a_eliminar.json', JSON.stringify(publicIdsHuerfanas, null, 2));

    // 6. Mostrar resumen
    console.log('\n' + '='.repeat(60));
    console.log('📋 ANÁLISIS DE IMÁGENES HUÉRFANAS');
    console.log('='.repeat(60));
    console.log(`📊 Total de imágenes en Cloudinary: ${todasLasImagenes.length}`);
    console.log(`✅ Imágenes en uso: ${imagenesEnUso.length}`);
    console.log(`🗑️  Imágenes huérfanas: ${imagenesHuerfanas.length}`);
    console.log(`💾 Espacio total: ${reporte.espacio_total_mb} MB`);
    console.log(`🗑️  Espacio huérfanas: ${reporte.espacio_huerfanas_mb} MB`);
    console.log(`💰 Espacio a liberar: ${reporte.espacio_huerfanas_mb} MB`);
    console.log('='.repeat(60));

    if (imagenesHuerfanas.length > 0) {
      console.log('\n🗑️  IMÁGENES HUÉRFANAS ENCONTRADAS:');
      imagenesHuerfanas.forEach((img, index) => {
        console.log(`${index + 1}. ${img.public_id}`);
        console.log(`   📅 Creada: ${img.created_at}`);
        console.log(`   💾 Tamaño: ${(img.bytes / 1024).toFixed(2)} KB`);
        console.log(`   🔗 URL: ${img.url}\n`);
      });
    }

    console.log('\n📁 Archivos generados:');
    console.log('   • reporte_imagenes_huerfanas.json - Reporte completo');
    console.log('   • imagenes_a_eliminar.json - Lista de public_ids para eliminar');

    if (imagenesHuerfanas.length > 0) {
      console.log('\n⚠️  Para eliminar las imágenes huérfanas, ejecuta:');
      console.log('   node scripts/cleanupOrphaned.js eliminar');
    }

  } catch (error) {
    console.error('❌ Error en análisis:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

async function eliminarImagenesHuerfanas() {
  try {
    console.log('🗑️  Iniciando eliminación de imágenes huérfanas...');
    
    // Leer lista de imágenes a eliminar
    const publicIds = JSON.parse(fs.readFileSync('imagenes_a_eliminar.json', 'utf8'));
    
    if (publicIds.length === 0) {
      console.log('✅ No hay imágenes huérfanas para eliminar');
      return;
    }

    console.log(`🔍 Se eliminarán ${publicIds.length} imágenes huérfanas`);
    
    // Confirmar eliminación
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const confirmar = await new Promise(resolve => {
      readline.question('⚠️  ¿Estás seguro de eliminar estas imágenes? (si/no): ', resolve);
    });
    
    readline.close();

    if (confirmar.toLowerCase() !== 'si' && confirmar.toLowerCase() !== 'sí') {
      console.log('❌ Eliminación cancelada');
      return;
    }

    // Eliminar en lotes de 100 (límite de Cloudinary)
    const lotes = [];
    for (let i = 0; i < publicIds.length; i += 100) {
      lotes.push(publicIds.slice(i, i + 100));
    }

    let totalEliminadas = 0;
    const errores = [];

    for (let i = 0; i < lotes.length; i++) {
      try {
        console.log(`🗑️  Eliminando lote ${i + 1}/${lotes.length} (${lotes[i].length} imágenes)...`);
        
        const resultado = await cloudinary.api.delete_resources(lotes[i]);
        
        // Contar eliminaciones exitosas
        const eliminadas = Object.values(resultado.deleted).filter(status => status === 'deleted').length;
        totalEliminadas += eliminadas;
        
        // Registrar errores
        Object.entries(resultado.deleted).forEach(([publicId, status]) => {
          if (status !== 'deleted') {
            errores.push({ publicId, status });
          }
        });
        
        console.log(`   ✅ Eliminadas: ${eliminadas}/${lotes[i].length}`);
        
        // Pausa entre lotes para no saturar la API
        if (i < lotes.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`❌ Error en lote ${i + 1}:`, error.message);
        errores.push({ lote: i + 1, error: error.message });
      }
    }

    // Reporte final
    console.log('\n' + '='.repeat(50));
    console.log('📋 RESUMEN DE ELIMINACIÓN');
    console.log('='.repeat(50));
    console.log(`✅ Imágenes eliminadas: ${totalEliminadas}/${publicIds.length}`);
    console.log(`❌ Errores: ${errores.length}`);
    console.log('='.repeat(50));

    if (errores.length > 0) {
      console.log('\n❌ ERRORES:');
      errores.forEach(error => {
        console.log(`   • ${error.publicId || `Lote ${error.lote}`}: ${error.status || error.error}`);
      });
    }

    // Guardar reporte de eliminación
    const reporteEliminacion = {
      fecha_eliminacion: new Date().toISOString(),
      total_procesadas: publicIds.length,
      eliminadas_exitosamente: totalEliminadas,
      errores: errores
    };
    
    fs.writeFileSync('reporte_eliminacion.json', JSON.stringify(reporteEliminacion, null, 2));
    console.log('\n📄 Reporte guardado en: reporte_eliminacion.json');

  } catch (error) {
    console.error('❌ Error en eliminación:', error);
  }
}

// Ejecutar según parámetro
const comando = process.argv[2];

switch (comando) {
  case 'analizar':
    identificarImagenesHuerfanas();
    break;
  case 'eliminar':
    eliminarImagenesHuerfanas();
    break;
  default:
    console.log('Uso: node scripts/cleanupOrphaned.js [analizar|eliminar]');
    console.log('  analizar  - Identificar imágenes huérfanas');
    console.log('  eliminar  - Eliminar imágenes huérfanas (requiere análisis previo)');
    console.log('');
    console.log('Ejemplo:');
    console.log('  1. node scripts/cleanupOrphaned.js analizar');
    console.log('  2. node scripts/cleanupOrphaned.js eliminar');
}

module.exports = { identificarImagenesHuerfanas, eliminarImagenesHuerfanas };