import React from 'react';

import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="ml-2 text-xl font-semibold text-gray-800">Websites.co.in</span>
        </a>

        <div className="hidden md:flex space-x-6">
          <NavLink to={"/"} className="text-gray-600 hover:text-blue-600">Home</NavLink>
          <NavLink to={"/"} className="text-gray-600 hover:text-blue-600">Services</NavLink>
          <NavLink to={"/"} className="text-gray-600 hover:text-blue-600">Pricing</NavLink>
          <NavLink to={"/"} className="text-gray-600 hover:text-blue-600">About Us</NavLink>
          <NavLink to={"/"} className="text-gray-600 hover:text-blue-600">Contact</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink
            to={"/"}
            className="text-gray-600 hover:text-gray-800 hidden md:inline"
          >
            Login
          </NavLink>
          <NavLink
            to={"/"}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Get Started
          </NavLink>

          <button className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
