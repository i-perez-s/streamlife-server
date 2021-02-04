import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const followSchema = new Schema ({
    followed: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    follower: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
})

followSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('Follow', followSchema)
