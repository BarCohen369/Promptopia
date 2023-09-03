"use client"

import Link from 'next/link'
import Image from 'next/image'
import {DesktopNav} from '@components/DesktopNav'

export const Nav = () => {
    const isUserLoggedIn = true

    const handleLogout = () => {

    }

    return (
        <nav className={'nav'}>
            <Link href={'/'} className={'nav-logo'}>
                <Image src={'assets/images/logo.svg'} alt={'Promptopia logo'} width={30} height={30}
                       className={'object-contain'}/>
                <p className="logo_text">Promptopia</p>
            </Link>

            <DesktopNav {...{isUserLoggedIn}} handleLogout={handleLogout}/>
        </nav>
    )
}