"use client"

import {useState} from 'react'
import {NotificationObj} from '@/types/NotificationTypes'

type NotificationProps = {
    setNotification: (notification: NotificationObj | {}) => void
} & NotificationObj

export const Notification = ({type, message, setNotification}: NotificationProps) => {
    const [toggleClose, setToggleClose] = useState(false)
    const close = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setToggleClose(true)
        setNotification({})
    }

    setTimeout(() => {
        setToggleClose(true)
        setNotification({})
    }, 2500)

    return (
        <>
            {!toggleClose && (
                <section className={`${type.toLowerCase()}_notification`} role="alert">
                    <strong className="font-bold">{type}</strong>
                    &nbsp;
                    <span className="notification_message">{message}</span>
                    <button onClick={close}>
                        <svg className={`notification_close_icon_${type.toLowerCase()}`} role="button"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"><title>Close</title>
                            <path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                        </svg>
                    </button>
                </section>
            )
            }
        </>
    )
}