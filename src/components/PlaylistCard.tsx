// En un nuevo archivo llamado Playlist.tsx
import React from 'react'
import Image from 'next/image'
import type { Playlist } from '@/lib/spotify/types'

interface PlaylistProps {
    playlist: Playlist
    onPlaylistClick: (playlist: any) => void
    selectedPlaylists: string[]
}



const PlaylistCard: React.FC<PlaylistProps> = ({
    playlist,
    onPlaylistClick,
    selectedPlaylists,
}) => {
    return (
        <div
            key={playlist.id}
            className={`playList flex gap-4 cursor-pointer bg-[#242424] rounded-md p-3 border-2 ${
                selectedPlaylists.includes(playlist.id)
                    ? 'border-white'
                    : 'border-[#0c0c0c] hover:bg-[#383838]'
            } transition ${
                parseInt(playlist.tracks.total) === 0
                    ? 'opacity-50 pointer-events-none'
                    : ''
            } items-center`}
            onClick={() => {
                if (parseInt(playlist.tracks.total) > 0) {
                    onPlaylistClick(playlist)
                }
            }}
        >
            <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                width={70}
                height={70}
                className="rounded-md"
            />
            <div className="grow">
                <p className="font-semibold text-white">{playlist.name}</p>
                <p className="text-xs text-gray-400 font-semibold">
                    {playlist.tracks.total} songs
                </p>
            </div>
        </div>
    )
}

export default PlaylistCard;