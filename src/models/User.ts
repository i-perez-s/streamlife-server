import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new Schema ({
    username: { type: String, required: [true, 'the usuarname is necesary'], unique: true },
    email: { type: String, unique: [true, 'the email is necesary'], required: true },
    password: { type: String, required: true }
})

userSchema.pre('save',  async function (next)  {
    const hash = await bcrypt.hash(this.password, 10)
}


userSchema.methods.comparePassword = async (password: string) => {
    const user = this
    const compare = await bcrypt.compare(user.password, user.password)
    return compare
}


userSchema.methods.toJSON = () => {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('User', userSchema)
