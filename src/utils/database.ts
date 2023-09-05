import mongoose from 'mongoose'

let isConnected = false
const connectionOptions: mongoose.ConnectOptions = {
    dbName: 'promptopia'
}

export const connectToDatabase = async () => {
    console.log('connecting to database...')

    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.info('DB is already connected')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '',
            connectionOptions
        )

        isConnected = true
        console.info('DB connected')
    } catch (error) {
        console.error(error)
    }
}

