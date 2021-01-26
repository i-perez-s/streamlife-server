import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new Schema ({
    username: { type: String, required: [true, 'the usuarname is necesary'], unique: true },
    email: { type: String, unique: [true, 'the email is necesary'], required: true },
    password: { type: String, required: true }
})

userSchema.methods.hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}


userSchema.methods.comparePassword = async (passwordDb: string, passwordUser: string) => {
    return await bcrypt.compare(passwordUser, passwordDb)
}


userSchema.methods.toJSON = () => {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('User', userSchema)
