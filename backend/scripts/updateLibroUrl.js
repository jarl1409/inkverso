const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Crear el esquema directamente (copiado de tu modelo)
const LibroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imagenURL: {
    type: String,
  },
  categoria: {
    type: String,
  },
});

const Libro = mongoose.model('Libro', LibroSchema);

async function actualizarURLsEnDB() {
  try {
    // Conectar a MongoDB usando DB_URI (tu variable de entorno)
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conectado a MongoDB');

    // Leer el mapeo generado por la migración
    const mapeo = JSON.parse(fs.readFileSync('mapeo_uploads_cloudinary.json', 'utf8'));
    
    console.log(`🔍 Procesando ${Object.keys(mapeo).length} archivos migrados...\n`);
    
    let actualizados = 0;
    let noEncontrados = 0;
    
    for (const [archivoOriginal, datos] of Object.entries(mapeo)) {
      try {
        // Extraer solo el nombre del archivo
        const nombreArchivo = archivoOriginal.split('/').pop();
        
        // Buscar libros que contengan este nombre de archivo en su imagenURL
        const librosConImagen = await Libro.find({
          imagenURL: { $regex: nombreArchivo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
        });
        
        if (librosConImagen.length > 0) {
          // Actualizar cada libro encontrado
          for (const libro of librosConImagen) {
            const urlAnterior = libro.imagenURL;
            libro.imagenURL = datos.secure_url;
            await libro.save();
            
            console.log(`✅ Actualizado: ${libro.titulo}`);
            console.log(`   Antes: ${urlAnterior}`);
            console.log(`   Después: ${datos.secure_url}\n`);
            actualizados++;
          }
        } else {
          console.log(`⚠️  No se encontraron libros con imagen: ${nombreArchivo}`);
          noEncontrados++;
        }
        
      } catch (error) {
        console.error(`❌ Error procesando ${archivoOriginal}:`, error.message);
      }
    }
    
    // Resumen final
    console.log('\n' + '='.repeat(50));
    console.log('📋 RESUMEN DE ACTUALIZACIÓN DB');
    console.log('='.repeat(50));
    console.log(`✅ Libros actualizados: ${actualizados}`);
    console.log(`⚠️  Archivos sin coincidencia: ${noEncontrados}`);
    console.log('='.repeat(50));
    
    // Verificar resultado
    const librosConCloudinary = await Libro.find({
      imagenURL: { $regex: 'cloudinary' }
    }).select('titulo imagenURL');
    
    console.log(`\n🔍 Verificación: ${librosConCloudinary.length} libros ahora usan Cloudinary`);
    
    // Generar reporte de verificación
    const reporte = {
      fecha_actualizacion: new Date().toISOString(),
      libros_actualizados: actualizados,
      archivos_sin_coincidencia: noEncontrados,
      libros_con_cloudinary: librosConCloudinary.map(l => ({
        titulo: l.titulo,
        imagenURL: l.imagenURL
      }))
    };
    
    fs.writeFileSync('reporte_actualizacion_db.json', JSON.stringify(reporte, null, 2));
    console.log('📄 Reporte guardado en: reporte_actualizacion_db.json');
    
  } catch (error) {
    console.error('❌ Error en actualización:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

async function crearBackupAntes() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Conectado a MongoDB para backup');
    
    const libros = await Libro.find({ imagenURL: { $exists: true, $ne: '' } })
      .select('_id titulo imagenURL');
    
    const backup = libros.map(l => ({
      _id: l._id,
      titulo: l.titulo,
      imagenURL_original: l.imagenURL
    }));
    
    fs.writeFileSync('backup_urls_originales.json', JSON.stringify(backup, null, 2));
    console.log(`💾 Backup creado: ${backup.length} URLs guardadas en backup_urls_originales.json`);
    
  } catch (error) {
    console.error('❌ Error creando backup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

async function rollbackURLs() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('🔄 Iniciando rollback...');
    
    const backup = JSON.parse(fs.readFileSync('backup_urls_originales.json', 'utf8'));
    
    for (const item of backup) {
      await Libro.findByIdAndUpdate(item._id, { imagenURL: item.imagenURL_original });
    }
    
    console.log('✅ Rollback completado');
  } catch (error) {
    console.error('❌ Error en rollback:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Ejecutar según parámetro
const comando = process.argv[2];

switch (comando) {
  case 'backup':
    crearBackupAntes();
    break;
  case 'actualizar':
    actualizarURLsEnDB();
    break;
  case 'rollback':
    rollbackURLs();
    break;
  default:
    console.log('Uso: node updateLibroUrlClean.js [backup|actualizar|rollback]');
    console.log('  backup    - Crear backup de URLs actuales');
    console.log('  actualizar - Actualizar URLs a Cloudinary');
    console.log('  rollback  - Revertir cambios');
}