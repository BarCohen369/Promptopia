"use client"

import {navProps} from '@/types/navTypes'
import Image from 'next/image'
import {useState} from 'react'
import {MobileNavLink} from '@components/MobileNavLink'

export const MobileNav = ({isUserLoggedIn, handleLogout, handleLogin, providers, userImage}: navProps) => {
    const [toggleDropdown, setToggleDropdown] = useState(false)

    return (
        <div className="small-screen-f">
            {isUserLoggedIn ? (
                <div className={'flex'}>
                    <Image
                        src={userImage || ''}
                        alt={'Profile'}
                        width={37}
                        height={37}
                        className={'profile-image-mobile'}
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
                                href={'/create-post'}
                                {...{setToggleDropdown}}
                            >
                                Create Post
                            </MobileNavLink>
                            <MobileNavLink
                                as={'div'}
                                {...{setToggleDropdown}}
                            >
                                <button
                                    type={'button'}
                                    onClick={handleLogout}
                                    className={'logout-btn-mobile'}
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
                            Sign In with {provider.name}
                        </button>
                    ))}
                </>
            )}
        </div>
    )
}