import React from 'react'
import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
      <div className="">
        <ul className="flex items-center gap-8">
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          <li>
            <Link
              href="/register"
              className="bg-black text-white px-5 py-2 rounded-xl"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};



export default Navbar
