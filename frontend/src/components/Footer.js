import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
        <footer className="py-8 text-center bg-gray-900 border-t border-gray-700">
            <p className="text-gray-400">© {new Date().getFullYear()} Eventify. All rights reserved.</p>
            <div className="mt-4 space-x-4">
                <Link to="#" className="text-teal-500 hover:text-teal-400">Privacy Policy</Link>
                <Link to="#" className="text-teal-500 hover:text-teal-400">Terms of Service</Link>
            </div>
        </footer>
        </div>
    )
}

export default Footer;
