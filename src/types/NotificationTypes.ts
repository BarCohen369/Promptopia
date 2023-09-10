export type NotificationObj = {
    type: 'Error' | 'Success' | 'Info'
    message: string
}

export type NotificationContextData = {
    notification: Notification | {}
    setNotification: (notification: Notification | {}) => void
    setError: (message: string) => void
}