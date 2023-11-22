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
                hostname: '**.spotifycdn.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
}
