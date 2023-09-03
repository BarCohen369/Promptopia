"use client"

import {navProps} from '@/types/navTypes'
import Image from 'next/image'
import {useState} from 'react'
import {MobileNavLink} from '@components/MobileNavLink'

export const MobileNav = ({isUserLoggedIn, handleLogout, handleLogin, providers}: navProps) => {
    const [toggleDropdown, setToggleDropdown] = useState(false)

    return (
        <div className="small-screen-f">
            {isUserLoggedIn ? (
                <div className={'flex'}>
                    <Image
                        /* Placeholder. user image goes here */
                        src={'assets/images/logo.svg'}
                        alt={'Profile'}
                        width={37}
                        height={37}
                        className={'rounded-full'}
                        onClick={() => setToggleDropdown(prevState => !prevState)}
                    />

                    {toggleDropdown && (
                        <div className={'dropdown'}>
                            <MobileNavLink
                                href={'/profile'}
                                {...{setToggleDropdown}}
                            >
                                Profile
                            </MobileNavLink>
                            <MobileNavLink
                                href={'/create-prompt'}
                                {...{setToggleDropdown}}
                            >
                                Create Prompt
                            </MobileNavLink>
                            <MobileNavLink
                                as={'div'}
                                {...{setToggleDropdown}}
                            >
                                <button
                                    type={'button'}
                                    onClick={handleLogout}
                                    className={'mt-5 w-full black_btn'}
                                >
                                    Logout
                                </button>
                            </MobileNavLink>
                        </div>
                    )}

                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            key={provider.name}
                            type="button"
                            className="black_btn"
                            onClick={() => handleLogin(provider.id, '/')}
                        >
                            {provider.name}
                        </button>
                    ))}
                </>
            )}
        </div>
    )
}