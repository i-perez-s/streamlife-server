import mongoose from 'mongoose'

export const connectDb = async() => {
    await mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true })
    .then(() => {
        console.log('>>>>>>>>>>>>> DB connected')
            //creacion del server
    })
    .catch(err => console.log(err))

}
