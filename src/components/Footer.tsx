import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
    faCloudflare,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full h-24">
            <p className="text-sm mb-2 mx-6 text-center">
                Thanks to{' '}
                <Link
                    className="underline"
                    href="https://github.com/dromzeh"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Dromzeh
                </Link>
                {' '}for creating {' '}
                <Link
                    className="underline"
                    href="https://github.com/dromzeh/mergify.site"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    mergify.site
                </Link>
                , the base for this app :D
            </p>
            <div className="flex items-center space-x-2">
                <Link
                    href="https://github.com/la-lo-go"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faGithub}
                        className="w-4 h-4 hover:text-white"
                    />
                </Link>
                <Link
                    href="https://twitter.com/la_lo_go"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faTwitter}
                        className="w-4 h-4 hover:text-white"
                    />
                </Link>
            </div>
        </footer>
    )
}
