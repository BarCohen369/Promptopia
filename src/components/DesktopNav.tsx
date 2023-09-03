"use client"

import Link from 'next/link'
import {navProps} from '@/types/navTypes'
import Image from 'next/image'

export const DesktopNav = ({isUserLoggedIn, handleLogout}: navProps) => {
    return (
        <div className="hidden sm:flex large-screen">
            {isUserLoggedIn ? (
                <div className={'flex gap-3 md:gap-5'}>
                    <Link href={'/create-prompt'} className={'black_btn'}>
                        Create Prompt
                    </Link>

                    <button type={'button'} onClick={handleLogout} className={'outline_btn'}>
                        Logout
                    </button>

                    <Link href={'/profile'}>
                        <Image
                            /* Placeholder. user image goes here */
                            src={'assets/images/logo.svg'}
                               alt={'Profile'}
                               width={37}
                               height={37}
                               className={'rounded-full'}
                        />
                    </Link>
                </div>

                ) : (
                <></>
                )}
        </div>
    )
}