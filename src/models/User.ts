import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const UserSchema = new Schema ({
    username: { type: String, required: [true, 'the usuarname is necesary'], unique: true },
    email: { type: String, unique: [true, 'the email is necesary'], required: true },
    password: { type: String, required: true },
    isInLive: { type: Boolean, required: false, default: false },
    photo: {type: String, required: false}
})

UserSchema.pre('save',  async function (next)  {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})


UserSchema.methods.comparePassword = async (password: string) => {
    const user = this
    var userPasword:string
    if (!user.password) {

	userPasword = ':)'
    } else {
	userPasword = user.password
    }
    const compare = await bcrypt.compare(password, userPasword)
    return compare
}



UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('User', UserSchema)
