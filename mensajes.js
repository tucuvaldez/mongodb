import mongoose from 'mongoose';

// Definimos una constante
const mensajes = [
    {
        email: "email@email.com",
        message: "Hola",
        id: 1
    },

]

// Definir el esquema de los datos y del modelo para interactuar con la base de datos (Leer, escribir, etc (CRUD))

const mensajesSchema = new mongoose.Schema({
    email: { type: String, require: true },
    message: { type: String, require: true },
    id: { type: Number, require: true, unique: true },
});

const mensajesDAO = mongoose.model('mensajes', mensajesSchema) // Asi de simple creamos el modelo

// conexion a la base de datos: colegio 


await mongoose.connect('mongodb://localhost/ecommerce', {
    serverSelectionTimeoutMS: 3000,

})

console.log('Base de datos conectada!')

// Escritura a la base de datos

const inserciones = [];

for (const mensaje of mensajes) {
    inserciones.push(mensajesDAO.create(mensaje))
}

const result = await Promise.allSettled(inserciones);
const rejected = result.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log('Cantidad de fallos: ' + rejected.length)
} else {
    console.log('Todo OK!')
}

await mongoose.disconnect();