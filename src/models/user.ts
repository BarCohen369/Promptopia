import {model, models, Schema} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required'],
        match: [/^[a-zA-Z0-9_]+$/,
            'Username must contain only letters, numbers, and underscores']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)

export default User