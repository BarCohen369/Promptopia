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
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            'Username must be at least 8 characters long and contain only letters, numbers, and underscores']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)

export default User