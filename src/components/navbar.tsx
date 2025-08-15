'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
    const { data: session } = useSession();
    const user: User = session?.user as User

    return (
        <nav className='bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50'>
            <div className='container mx-auto px-4 h-16'>
                <div className='grid grid-cols-3 h-full items-center'>
                    {/* Logo - Left */}
                    <Link
                        href='/'
                        className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity'
                    >
                        Mystic Source
                    </Link>

                    {/* Welcome Message - Center */}
                    <div className='justify-self-center'>
                        {session && (
                            <div className='hidden md:block text-center'>
                                <span className='text-gray-300 font-light tracking-wide'>
                                    Welcome,{' '}
                                    <span className='text-blue-400 font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text'>
                                        {user?.username || user?.email}
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Auth Button - Right */}
                    <div className='justify-self-end'>
                        {session ? (
                            <Button
                                className='bg-gray-800 hover:bg-gray-700 text-gray-200'
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link href='/sign-in'>
                                <Button
                                    className='bg-blue-500 hover:bg-blue-600 text-white'
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar