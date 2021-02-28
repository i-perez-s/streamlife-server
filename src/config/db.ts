import mongoose from "mongoose"

export const connectDb = async() => {
    try {
        if (process.env.URI_MONGO === undefined) {
            process.env.URI_MONGO = ''
        }
        await mongoose.connect(process.env.URI_MONGO, { useNewUrlParser: true })
        console.log('>>>Db connected')
    } catch (error) {
        console.log(error)
        throw new Error("Error connecting to the db")
    }
}
