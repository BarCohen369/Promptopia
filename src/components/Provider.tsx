"use client"

import {SessionProvider} from 'next-auth/react'
import {Session} from 'next-auth'


export const Provider = ({ children, session}: { children: React.ReactNode, session?: Session }) => {
    return (
        <SessionProvider session={session || null}>
            {children}
        </SessionProvider>
    )
}