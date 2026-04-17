'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Hero Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-b from-[#2A2A2A]/40 via-[#1A1A1A]/60 to-[#0F0F0E] flex flex-col items-center justify-center border-2 border-dashed border-[#C9A96E]/30">
          <p className="text-[#C9A96E]/60 italic font-cormorant text-xl">Hero Background — Building Exterior / Aerial View</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-block mb-8 border border-[#C9A96E] px-6 py-2 text-[#C9A96E] text-xs font-montserrat uppercase tracking-widest transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          Exclusive 3BHKs · G+45 Floors
        </div>

        {/* Main Headline */}
        <h1
          className={`font-cormorant italic text-6xl md:text-7xl lg:text-8xl text-[#FAF7F2] mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          In Financial District, Gachibowli
        </h1>

        {/* Subheading */}
        <p
          className={`text-[#A89880] font-montserrat text-sm md:text-base uppercase tracking-widest mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          1,695 sq. ft · Starting ₹1.94 Cr (All Inclusive + GST)
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col md:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="px-10 py-4 bg-[#C9A96E] text-[#1A1A1A] font-montserrat uppercase tracking-wide hover:bg-[#BFA06A] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/20">
            Book a Site Visit
          </button>
          <button className="px-10 py-4 border-2 border-[#C9A96E] text-[#C9A96E] font-montserrat uppercase tracking-wide hover:bg-[#C9A96E]/10 transition-all duration-300">
            Download Brochure
          </button>
        </div>

        {/* RERA */}
        <p className="text-[#A89880]/60 text-xs font-montserrat uppercase tracking-wider">
          RERA No: P02400006761
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-scroll text-[#C9A96E] text-center">
          <p className="text-xs uppercase font-montserrat tracking-widest mb-3">Scroll</p>
          <svg
            className="w-5 h-5 mx-auto animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
