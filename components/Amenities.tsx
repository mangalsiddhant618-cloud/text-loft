'use client'

import { useEffect, useState, useRef } from 'react'

export default function Amenities() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const amenities = [
    { icon: '🏛️', label: 'Clubhouse' },
    { icon: '🏊', label: 'Swimming Pool' },
    { icon: '💪', label: 'Gymnasium' },
    { icon: '💼', label: 'Co-working Space' },
    { icon: '🛒', label: 'Supermarket' },
    { icon: '🎾', label: 'Indoor Sports' },
    { icon: '🏨', label: 'Guest Suites' },
    { icon: '👶', label: 'Childcare' },
  ]

  return (
    <section id="amenities" ref={ref} className="py-24 px-6 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={`font-cormorant italic text-5xl md:text-6xl text-[#FAF7F2] mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Carefully Curated Lifestyle
          </h2>
          <p
            className={`text-[#A89880] font-lato text-lg leading-relaxed max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            With 55,000 sq. ft. clubhouse, 30,000 sq. ft. fitness zone, olympic pool, co-working spaces, pharmacy, and more—your lifestyle is at your doorstep.
          </p>
        </div>

        {/* Image Placeholder */}
        <div
          className={`h-96 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-dashed border-[#C9A96E]/30 flex items-center justify-center mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <p className="text-[#C9A96E]/60 italic font-cormorant text-lg">Clubhouse / Amenities Aerial View</p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {amenities.map((amenity, idx) => (
            <div
              key={idx}
              className={`group flex flex-col items-center gap-3 p-6 bg-[#0F0F0E] border border-[#C9A96E]/20 hover:border-[#C9A96E]/60 transition-all duration-300 text-center cursor-pointer transform duration-1000 ${
                isVisible ? `opacity-100 translate-y-0 delay-${(idx + 4) * 50}` : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-4xl">{amenity.icon}</span>
              <p className="font-montserrat text-sm uppercase tracking-wide text-[#FAF7F2] group-hover:text-[#C9A96E] transition-colors">
                {amenity.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-3 border-2 border-[#C9A96E] text-[#C9A96E] font-montserrat uppercase tracking-wide hover:bg-[#C9A96E]/10 transition-all duration-300">
            <span>Explore Amenities</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
