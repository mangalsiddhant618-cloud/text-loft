'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#C9A96E]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="font-cormorant text-2xl font-semibold tracking-wider text-[#C9A96E] italic">
          ASBL LOFT
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#about"
            className="text-[#FAF7F2] hover:text-[#C9A96E] transition-colors text-sm font-montserrat uppercase tracking-wide"
          >
            About
          </Link>
          <Link
            href="#location"
            className="text-[#FAF7F2] hover:text-[#C9A96E] transition-colors text-sm font-montserrat uppercase tracking-wide"
          >
            Location
          </Link>
          <Link
            href="#floor-plans"
            className="text-[#FAF7F2] hover:text-[#C9A96E] transition-colors text-sm font-montserrat uppercase tracking-wide"
          >
            Floor Plans
          </Link>
          <Link
            href="#amenities"
            className="text-[#FAF7F2] hover:text-[#C9A96E] transition-colors text-sm font-montserrat uppercase tracking-wide"
          >
            Amenities
          </Link>
          <Link
            href="#contact"
            className="text-[#FAF7F2] hover:text-[#C9A96E] transition-colors text-sm font-montserrat uppercase tracking-wide"
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <button className="px-6 py-2 border-2 border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-all duration-300 text-sm font-montserrat uppercase tracking-wide">
          Book a Site Visit
        </button>
      </div>
    </header>
  )
}
