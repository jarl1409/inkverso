"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Agregar el campo de fecha de nacimiento (porque no estaba al incio)
require("dotenv/config");
const db_1 = require("../src/config/db");
const Usuario_1 = require("../src/models/Usuario");
async function run() {
    await (0, db_1.conectarDB)();
    const res = await Usuario_1.Usuario.updateMany({ birthDate: { $exists: false } }, { $set: { birthDate: null } });
    console.log(`Migración completa: ${res.modifiedCount} documentos actualizados.`);
    process.exit(0);
}
run().catch((err) => {
    console.error('Error en migración:', err);
    process.exit(1);
});
