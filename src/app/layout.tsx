import '@styles/global.css'
import {Nav} from '@components/Nav'
import {Provider} from '@contexts/Provider'
import {Notification} from '@components/Notfication'
import {getServerSession} from 'next-auth'
import {authOptions} from '@app/api/auth/[...nextauth]/route'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover, create, and share AI prompts.'
}

const RootLayout = async ({children}: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)

    return (
        <html>
        <body>
        <Provider session={session || undefined}>
            <Notification/>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav/>
                {children}
            </main>
        </Provider>
        </body>
        </html>
    )
}

export default RootLayout