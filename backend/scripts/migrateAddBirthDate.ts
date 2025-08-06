// Agregar el campo de fecha de nacimiento (porque no estaba al incio)
import 'dotenv/config'
import { conectarDB } from '../src/config/db'
import { Usuario } from '../src/models/Usuario'

async function run() {
  await conectarDB()
  const res = await Usuario.updateMany(
    { birthDate: { $exists: false } },
    { $set: { birthDate: null } }
  )
  console.log(`Migración completa: ${res.modifiedCount} documentos actualizados.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Error en migración:', err)
  process.exit(1)
})
