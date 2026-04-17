'use client'

import { useEffect, useState, useRef } from 'react'

export default function FloorPlans() {
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

  return (
    <section id="floor-plans" ref={ref} className="py-24 px-6 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2
            className={`font-cormorant italic text-5xl md:text-6xl text-[#FAF7F2] mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Thoughtfully Designed 3BHK Layouts
          </h2>
          <p
            className={`text-[#A89880] font-lato text-lg leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Each residence spans 1,695 or 1,870 sq. ft., featuring expansive rooms and ASBL&apos;s signature Outdoor Living balcony
          </p>
        </div>

        {/* Floor Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            { type: 'Type A', size: '1,695 sq. ft.', delay: 'delay-300' },
            { type: 'Type B', size: '1,870 sq. ft.', delay: 'delay-500' },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`group cursor-pointer transition-all duration-1000 ${
                isVisible ? `opacity-100 translate-y-0 ${plan.delay}` : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Image Placeholder */}
              <div className="h-96 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-dashed border-[#C9A96E]/30 flex items-center justify-center mb-6 group-hover:border-[#C9A96E]/60 transition-colors duration-300">
                <p className="text-[#C9A96E]/60 italic font-cormorant text-lg">Floor Plan — {plan.size}</p>
              </div>

              {/* Plan Info */}
              <div className="text-center">
                <h3 className="font-montserrat uppercase text-[#C9A96E] text-sm tracking-wide mb-2">
                  {plan.type}
                </h3>
                <p className="font-cormorant italic text-2xl text-[#FAF7F2]">{plan.size}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-3 border-2 border-[#C9A96E] text-[#C9A96E] font-montserrat uppercase tracking-wide hover:bg-[#C9A96E]/10 transition-all duration-300">
            <span>Explore All Plans</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
