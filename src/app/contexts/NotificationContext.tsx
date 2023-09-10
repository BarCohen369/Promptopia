"use client"

import {createContext, ReactNode, useContext, useState} from 'react'
import {NotificationContextData, NotificationObj} from '@/types/NotificationTypes'

type ContextProps = {
    children: ReactNode | undefined
}

const NotificationContext: React.Context<NotificationContextData | {}> = createContext({})
export const useNotification = () => useContext(NotificationContext)
export const NotificationProvider = ({children}: ContextProps) => {
    const [notification, setNotification] = useState<NotificationObj | {}>({})

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}
