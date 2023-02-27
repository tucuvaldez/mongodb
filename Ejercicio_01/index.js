// importar dependencias
import mongoose from 'mongoose'

//Definimos una constante

const estudiantes = [
    {
        nombre: 'Juan',
        apellido: 'Rodriguez',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 6,
    },
    {
        nombre: 'Juan',
        apellido: 'Rodriguez',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 6,
    },
    {
        nombre: 'Lucas',
        apellido: 'Blanco',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 4,
    },
    {
        nombre: 'Juan',
        apellido: 'Rodriguez',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 2,
    },
    {
        nombre: 'Juan',
        apellido: 'Valdez',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 8,
    },
    {
        nombre: 'Pedro',
        apellido: 'Perez',
        edad: 22,
        dni: 34678765,
        curso: 'CoderHouse',
        nota: 6,
    },
]

//Definir esquema de datos y modelo para interactuar con la db (lerr, escribir, etc)

const estudiantesSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true },
})
//creamos modelo
const estudiantesDAO = mongoose.model('estudiantes', estudiantesSchema)

//Conexion a base de datos

await mongoose.connect('mongodb://localhost:27017/colegio', {
    serverSelectionTimeoutMS: 3000,
})
console.log('Base de datos conectada')

//Escritura a la base de datos
const inserciones = []

for (const estudiante of estudiantes) {
    inserciones.push(estudiantesDAO.create(estudiante))
}

const result = await Promise.allSettled(inserciones)
const rejected = result.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log('Cantidad de fallas' + rejected.lenght)
} else {
    console.log('Todo OK')
}


await mongoose.disconnect()