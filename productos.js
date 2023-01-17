// importar dependencias
import mongoose from 'mongoose'

//Definimos una constante

const productos = [
    {
        name: 'Mesa',
        price: 2344,
        thumbnail: 'www.foto.com/foto',
        id: 1
    }
]

//Definir esquema de datos y modelo para interactuar con la db (lerr, escribir, etc)

const productosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    id: { type: Number, required: true, unique: true }
})
//creamos modelo
const ProductosDAO = mongoose.model('productos', productosSchema)

//Conexion a base de datos

await mongoose.connect('mongodb://localhost:27017/info', {
    serverSelectionTimeoutMS: 3000,
})
console.log('Base de datos conectada')

//Escritura a la base de datos
const inserciones = []

for (const producto of productos) {
    inserciones.push(ProductosDAO.create(producto))
}

const result = await Promise.allSettled(inserciones)
const rejected = result.filter(r => r.status == 'rejected')
if (rejected.length > 0) {
    console.log('Cantidad de fallas' + rejected.lenght)
} else {
    console.log('Todo OK')
}


await mongoose.disconnect()