import { useMemo } from 'react'
import type { Playlist } from '@/lib/spotify/types'
import type { PlaylistManagerProps } from '@/lib/spotify/types'
import PlaylistCard from './PlaylistCard'
import Image from 'next/image'

export function PlaylistManager({
    playlists,
    selectedPlaylists,
    searchQuery,
    onSearchChange,
    onPlaylistClick,
    onMerge,
}: PlaylistManagerProps) {
    const filteredPlaylists = useMemo(() => {
        return playlists.filter((playlist) => {
            const match = playlist.name.match(/\b(20\d{2})\b/);
            const year = match ? Number(match[1]) : 0;
            return playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) && year > 2015;
        })
    }, [playlists, searchQuery])

    return (
        <div className="mt-6 w-full">
            <div className="text-white text-center" >
                <p className="text-xl font-semibold">
                    Select playlists to create a Mega Wrapped 
                </p>
            </div>
            {/* <input
                className="mt-4 w-full bg-[#0C0C0C] text-white font-semibold rounded-md p-2 text-sm focus:outline-none"
                placeholder="Search playlists"
                value={searchQuery}
                onChange={onSearchChange}
            /> */}
            
            <div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            onPlaylistClick={onPlaylistClick}
                            selectedPlaylists={selectedPlaylists}
                        />
                    ))}
                </div>
            </div>
            <button
                disabled={selectedPlaylists.length < 2}
                className={`
                hover:bg-[#87dd84] hover:text-[#0C0C0C]
                transition mt-8 w-full bg-[#4fc74b] text-white font-extrabold rounded-md p-6 text-xl ${
                    selectedPlaylists.length < 2
                        ? 'opacity-50 cursor-not-allowed hover:bg-[#4fc74b]'
                        : ''
                }`}
                onClick={onMerge}
            >
                Merge {selectedPlaylists.length} playlists
            </button>
        </div>
    )
}
