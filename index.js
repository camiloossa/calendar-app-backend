const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


// Crear el servidor del express
const app = express();

// base de datos
dbConnection();

// cors
app.use(cors());

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/auth', express.static('public'));



// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Sevidor corriendo en puerto ${process.env.PORT}`)
})