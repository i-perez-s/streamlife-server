import mongoose from 'mongoose'



export const connectDb = async() => {
    await mongoose.connect(process.env.URI_MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any, res: any) => {
        if (err) return err
        return ">>>>>> Db connected"
    })

}
