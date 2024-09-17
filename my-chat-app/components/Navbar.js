"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo Section */}
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <span className="text-xl font-bold">MyChatApp</span>
              </Link>
            </div>
          </div>

          {/* Navbar Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</span>
            </Link>
            <Link href="/features">
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</span>
            </Link>
          </div>

          {/* Login/Signup Buttons */}
          <div className="flex items-center">
            <Link href="/login">
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium mr-4">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="text-blue-600 border border-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
