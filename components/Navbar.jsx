import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Fade from 'react-reveal/Fade'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

function Navbar() {

    const menuRef = useRef()
    const { data: session } = useSession();
    const handleMobileMenu = () => {
        menuRef.current?.classList?.toggle('hidden')
    }
    const router = useRouter();
    return (
        <nav>
            <Fade top>
                <div
                    className="relative flex items-center justify-between h-16 text-xl text-black"
                    role="navigation"
                >
                    <Link href="/" className="lg:pl-8">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={72}
                            height={72}
                            className="w-10 sm:w-full"
                        />
                    </Link>
                    <div
                        className="px-4 cursor-pointer md:hidden"
                        onClick={handleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </div>
                    <div className="hidden w-full lg:pr-8 md:flex lg:w-fit">
                        <Link
                            href="#popular-recipes"
                            className="p-4 link link-underline link-underline-black"
                        >
                            Popular Recipes
                        </Link>
                        <Link
                            href="#what-they-say"
                            className="p-4 link link-underline link-underline-black "
                        >
                            What They Say
                        </Link>
                        <Link
                            href="#contact"
                            className="p-4 link link-underline link-underline-black "
                        >
                            Contact
                        </Link>
                        {/* register CTA */}
                        {
                            session ? (
                                <div className='flex items-center space-x-3'>
                                    <img src={session.user.image} alt="user image" className="rounded-full w-14 h-14" />
                                    <Link href="/profile">
                                        <button className="p-4 link link-underline link-underline-black">
                                            Saved
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="p-4 text-white rounded bg-primary hover:bg-primary-hover"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) :
                                router.pathname !== '/register' ? (
                                    <Link
                                        href="/register"
                                        className="p-4 text-white rounded bg-primary hover:bg-primary-hover"
                                    >
                                        Register
                                    </Link>)
                                    : null
                        }
                    </div>
                </div>
                {/* mobile menu */}
                <div ref={menuRef} className="hidden md:hidden">
                    <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        Home
                    </Link>
                    <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        About
                    </Link>
                    <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-hover hover:text-white"
                        role="menuitem"
                    >
                        Login
                    </Link>
                </div>
            </Fade>
        </nav>
    )
}

export default Navbar

