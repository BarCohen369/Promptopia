"use client"

import Link from 'next/link'
import Image from 'next/image'
import {DesktopNav} from '@components/DesktopNav'
import {useEffect, useState} from 'react'
import {ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession} from 'next-auth/react'
// @ts-ignore
import {BuiltInProviderType} from 'next-auth/providers'
import {MobileNav} from '@components/MobileNav'
import {useRouter} from 'next/navigation'

export const Nav = () => {
    const {data: session, status} = useSession()
    const isUserLoggedIn = status === 'authenticated'
    const router = useRouter()

    const handleLogout = () => {
        signOut()
    }

    const handleLogin = (
        providerId: LiteralUnion<BuiltInProviderType>, callbackUrl: string
    ) => {
        // signIn(providerId, {callbackUrl})
        router.push('/disabled-login')
    }

    const [providers, setProviders] = useState<
        Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null
    >(null)

    useEffect(() => {
        const _getProviders = async () => {
            const providers = await getProviders()

            setProviders(providers)
        }

        _getProviders()
    }, [])

    return (
        <nav className={'nav'}>
            <Link href={'/'} className={'nav-logo'}>
                <Image src={'assets/images/logo.svg'} alt={'Promptopia logo'} width={30} height={30}
                       className={'object-contain'}/>
                <p className="logo_text">Promptopia</p>
            </Link>

            <DesktopNav {...{isUserLoggedIn, providers, handleLogout, handleLogin, userImage: session?.user?.image}} />
            <MobileNav {...{isUserLoggedIn, providers, handleLogout, handleLogin, userImage: session?.user?.image}} />
        </nav>
    )
}