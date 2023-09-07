import NextAuth, {Profile, Session} from 'next-auth'
import Google, {GoogleProfile} from 'next-auth/providers/google'
import {connectToDatabase} from '@utils/database'
import User from '@models/user'
import {UserProfile} from '@/types/userTypes'

declare module 'next-auth' {
    interface Session {
        user: UserProfile
    }
}

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

            session.user = {
                ...session.user,
                _id: sessionUser?._id
            }

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
                        image: profile.image || (profile as GoogleProfile).picture
                    })
                }
                return true
            } catch (e) {
                console.error(e instanceof Error ? e.message : e)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}