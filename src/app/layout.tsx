'use client'

import '@/app/globals.css'
import { Nunito } from 'next/font/google'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Session } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { SessionProvider } from 'next-auth/react'

const nunito = Nunito({ subsets: ['latin'] })

interface Props {
    session: Session | null
    children: React.ReactNode
    token: string | null
}

const RootLayout: React.FC<Props> = ({ children, session }) => {
    return (
        <html lang="en">
            <Head>
                <title>Spotify Mega Wrapped</title>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="Create a mega wrapped with the most important songs of your life"
                />
            </Head>
            <body className={nunito.className}>
                <div className="min-h-screen">
                        <SessionProvider session={session}>
                            {children}
                        </SessionProvider>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

export default RootLayout
