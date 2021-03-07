import mongoose from "mongoose"

export const connectDb = async() => {
    try {
        if (process.env.URI_MONGO_CLOUD === undefined) {
            process.env.URI_MONGO_CLOUD = ''
        }
        await mongoose.connect(process.env.URI_MONGO_CLOUD, { useNewUrlParser: true })
        console.log('>>>Db connected')
    } catch (error) {
        console.log(error)
        throw new Error("Error connecting to the db")
    }
}
