import mongoose from 'mongoose'

const connectionOptions: mongoose.ConnectOptions = {
    dbName: process.env.MONGODB_NAME
}

export const connectToDatabase = async () => {
    let isConnected = mongoose.connection.readyState
    console.log('connecting to database...')

    mongoose.set('strictQuery', true)
    if (isConnected === 1) {
        console.info('DB is already connected')
    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URI || '',
                connectionOptions
            )

            if (mongoose.connection.readyState === 1)
                console.info('DB connected')
        } catch (e) {
            console.error(e instanceof Error ? e.message : e)
        }
    }
}

