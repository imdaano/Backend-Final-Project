const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error('No se encuentra la URL en la base de datos');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const { name, host } = db.connection;
        console.log(`Conectado a la db: ${name} en ${host}`);
    }   catch(error) {
        console.log('Error al conectar con la base de datos: ', error);
    }
};

module.exports = {
    DB_URL,
    connectDb,
};