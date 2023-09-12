"use client"

import {SessionProvider} from 'next-auth/react'
import {Session} from 'next-auth'
import {NotificationProvider} from '@contexts/NotificationContext'


export const Provider = ({children, session}: { children: React.ReactNode, session?: Session }) => {
    return (
        <SessionProvider session={session || null}>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </SessionProvider>
    )
}