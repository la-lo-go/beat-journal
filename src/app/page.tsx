'use client'

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
    return (
        <main className="flex min-h-screen -mb-24 flex-col items-center justify-center p-12">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center text-white">
                    Beat Journal
                </h1>
                <p className="text-lg text-center text-white my-4">
                    Merge your wraps into one{' '}
                    <span className="text-gradient font-bold bg-gradient-to-tr bg-clip-text from-green-600 to-teal-800 text-transparent animate-text">
                        Beat Journal
                    </span>
                </p>
                <div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
                        <button
                            onClick={() =>
                                signIn('spotify', {
                                    callbackUrl: `${window.location.origin}/app`,
                                })
                            }
                            className="relative"
                        >
                            <div className="bg-gradient-to-r from-green-600 to-teal-800 rounded-md p-[2px]">
                                <div className="cursor-pointer relative items-center p-2 bg-background-100 border-1 rounded-md leading-none flex items-top justify-start space-x-6 hover:text-white font-semibold">
                                    <FontAwesomeIcon
                                        icon={faSpotify}
                                        className="mr-2 h-6 w-6"
                                    />
                                    Login with Spotify
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
