import NextAuth, {Profile, Session} from 'next-auth'
import Google from 'next-auth/providers/google'
import {connectToDatabase} from '@utils/database'
import User from '@models/user'
import {UserProfile} from '@/types/userTypes'

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],

    callbacks: {
        async session({session}: { session: Session }): Promise<Session> {
            const sessionUser : UserProfile | null = await User.findOne({
                email: session.user?.email
            })

            return session
        },
        async signIn({profile}: { profile?: Profile | undefined }): Promise<boolean> {
            if (!profile) return false

            try {
                await connectToDatabase()
                const userExist = await User.findOne({
                    email: profile.email
                })

                if (!userExist) {
                    await User.create({
                        username: profile.name?.replace(
                            ' ', ''
                        ),
                        email: profile.email,
                        image: profile.image
                    })
                }
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}