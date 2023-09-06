import {model, models, Schema} from 'mongoose'

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
        validate: {
            validator: (tags: string[]) => tags.length > 0,
            message: 'At least one tag is required'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt