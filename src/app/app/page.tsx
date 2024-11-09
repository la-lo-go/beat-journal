'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { SpotifyProfile } from '@/components/SpotifyProfile'
import { PlaylistManager } from '@/components/PlaylistManager'
import type { Playlist } from '@/lib/spotify/types'
import Merge from '@/components/Merge'

export default function Home() {
    const [isMergeVisible, setIsMergeVisible] = useState(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const { data: session, status } = useSession()

    const handleMergeClick = () => {
        setIsMergeVisible(true)
    }

    const handleCancelMerge = () => {
        setIsMergeVisible(false)
    }

    const handlePlaylistClick = (playlist: Playlist) => {
        const index = selectedPlaylists.indexOf(playlist.id)
        if (index === -1) {
            setSelectedPlaylists([...selectedPlaylists, playlist.id])
            setPlaylists((prevPlaylists) =>
                prevPlaylists.map((p) =>
                    p.id === playlist.id ? { ...p, selected: true } : p
                )
            )
        } else {
            setSelectedPlaylists([
                ...selectedPlaylists.slice(0, index),
                ...selectedPlaylists.slice(index + 1),
            ])
            setPlaylists((prevPlaylists) =>
                prevPlaylists.map((p) =>
                    p.id === playlist.id ? { ...p, selected: false } : p
                )
            )
        }
    }

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (status === 'authenticated') {
                let allPlaylists: Playlist[] = [];
                let offset = 0;
                const limit = 50;
                
                while (true) {
                    const response = await fetch(
                        `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
                        {
                            headers: {
                                Authorization: `Bearer ${session?.access_token ?? ''}`,
                            },
                        }
                    );
                    const data = await response.json();
                    allPlaylists = [...allPlaylists, ...data.items];
                    
                    if (data.items.length < limit) break;
                    
                    offset += limit;
                }
                
                setPlaylists(allPlaylists);
            }
        }

        fetchPlaylists()
    }, [status, session?.access_token])

    const handleLogout = () => {
        signOut({
            callbackUrl: '/',
        })
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
        <main className="min-h-full m-6">
            {session ? (
                <>
                    {session.user && (
                        <SpotifyProfile
                            imageUrl={session.user.image as string}
                            userName={session.user.name as string}
                            onLogout={handleLogout}
                        />
                    )}
                    <PlaylistManager
                        playlists={playlists}
                        selectedPlaylists={selectedPlaylists}
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onPlaylistClick={handlePlaylistClick}
                        onMerge={() => handleMergeClick()}
                    />
                    {isMergeVisible && (
                        <Merge
                            session={session}
                            playlists={playlists}
                            selectedPlaylists={selectedPlaylists}
                            onCancel={handleCancelMerge}
                        />
                    )}{' '}
                    {/* Conditional rendering */}
                </>
            ) : (
                <div className="h-fit my-32 flex flex-col">
                    <div className="text-sm text-center">
                        You must be{' '}
                        <a
                            href="https://beatjournal.lalogo.dev"
                            className='underline'
                        >
                            logged in
                        </a>{' '}
                        to view this page
                        <br />
                        (You might need to wait a little bit after logging in)
                    </div>
                </div>
            )}
        </main>
    )
}
