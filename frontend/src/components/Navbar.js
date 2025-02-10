import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    //  Reusable function for active link styling
    const getNavClass = (path) =>
        `transition px-3 py-2 rounded-md ${
            location.pathname === path
                ? "text-teal-400 font-bold shadow-lg" 
                : "text-white hover:text-teal-500"
        }`;

    return (
        <header className="bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/*  Brand Logo */}
                <Link className="text-teal-500 text-3xl font-extrabold tracking-wide" to="/">
                    Eventify
                </Link>

                {/*  Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-lg font-bold">
                    <Link className={getNavClass("/")} to="/">Home</Link>
                    <Link className={getNavClass("/about")} to="/about">About Us</Link>
                    <Link className={getNavClass("/events")} to="/events">Events</Link>
                    <Link className={getNavClass("/contact")} to="/contact">Contact</Link>
                </nav>

                {/*  User Actions */}
                <div className="flex items-center gap-4 font-bold">
                    {user ? (
                        <>
                            <Link className={getNavClass("/dashboard")} to="/dashboard">Dashboard</Link>
                            <button
                                className="hidden md:block bg-red-500 px-5 py-2 rounded-lg text-white font-medium transition hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="hidden md:block bg-teal-600 px-5 py-2 rounded-lg text-white font-medium transition hover:bg-teal-700" to="/login">
                                Login
                            </Link>
                            <Link className="hidden md:block border border-teal-500 px-5 py-2 rounded-lg text-teal-500 font-medium transition hover:bg-teal-500 hover:text-white" to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    {/*  Mobile Menu Toggle Button */}
                    <button className="md:hidden p-2 rounded-md bg-gray-700 text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/*  Mobile Dropdown Menu with Animation */}
            <div className={`md:hidden bg-gray-800 py-4 px-6 transition-transform duration-300 ${menuOpen ? "block" : "hidden"}`}>
                <nav className="flex flex-col gap-4">
                    <Link className={getNavClass("/")} to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link className={getNavClass("/about")} to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                    <Link className={getNavClass("/events")} to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
                    <Link className={getNavClass("/contact")} to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

                    {user ? (
                        <>
                            <Link className={getNavClass("/dashboard")} to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <button
                                className="bg-red-500 px-5 py-2 rounded-lg text-white font-medium transition hover:bg-red-600"
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="bg-teal-600 px-5 py-2 rounded-lg text-white font-medium transition hover:bg-teal-700" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link className="border border-teal-500 px-5 py-2 rounded-lg text-teal-500 font-medium transition hover:bg-teal-500 hover:text-white" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
