// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.scdn.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wrapped-images.spotifycdn.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}
