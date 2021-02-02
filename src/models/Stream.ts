import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const streamSchema = new Schema ({
    title: { type: String, required: [true, 'the title is necesary'] },
    category: { type: String, required: [true, 'the category is necesary']},
    viewers: { type: Number, required: false },
    isReady: { type: Boolean, required: false, default: false },
    streamer: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    pathStream: {type: String, required: false}
})

streamSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('Stream', streamSchema)
