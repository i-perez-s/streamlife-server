import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const EmoteSchema = new Schema ({
    idStreamerCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    urlEmote: { type: String, required: true },
})

EmoteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

export default mongoose.model('Emote', EmoteSchema)