import {ClientSafeProvider, LiteralUnion} from 'next-auth/react'
// @ts-ignore
import {BuiltInProviderType} from 'next-auth/providers'

export type navProps = {
    isUserLoggedIn: boolean
    handleLogout: () => void
    handleLogin: (providerId: LiteralUnion<BuiltInProviderType>,  callbackUrl: string ) => void
    providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null
    userImage: string | null | undefined
}