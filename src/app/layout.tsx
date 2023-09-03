import '@styles/global.css'
export const metadata = {
    title: 'Promptopia',
    description: 'Discover, create, and share AI prompts.',
}
const RootLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <html>
            <body>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                {children}
            </main>
            </body>
        </html>
    )
}

export default RootLayout