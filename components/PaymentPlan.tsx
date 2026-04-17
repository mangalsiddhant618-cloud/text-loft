'use client'

import { useEffect, useState, useRef } from 'react'

export default function PaymentPlan() {
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
    <section ref={ref} className="py-24 px-6 bg-[#0F0F0E] relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border border-[#C9A96E] rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 border border-[#C9A96E] rotate-12"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <h2
          className={`font-cormorant italic text-5xl md:text-6xl text-[#FAF7F2] text-center mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          The 25–75 Payment Plan
        </h2>
        <p className="text-center text-[#A89880] font-montserrat text-sm uppercase tracking-wider mb-16">
          Flexible & Easy Financing Options
        </p>

        {/* Timeline Steps */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { num: '1', title: 'Book with ₹5 Lakh', desc: '~2.5% of total cost', delay: 'delay-200' },
              { num: '2', title: 'Bank Disburses Remaining', desc: '22.5% within 30 days', delay: 'delay-400' },
              { num: '3', title: 'Pay 75% at Handover', desc: 'December 2026', delay: 'delay-600' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`text-center transition-all duration-1000 ${
                  isVisible ? `opacity-100 translate-y-0 ${step.delay}` : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Step Circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#C9A96E] flex items-center justify-center font-cormorant italic text-2xl text-[#1A1A1A] border-4 border-[#1A1A1A]">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-montserrat uppercase text-[#C9A96E] text-sm tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-[#A89880] font-lato text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Connecting Line (visual) */}
          <div className="hidden md:flex justify-center items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/30"></div>
            <p className="text-[#C9A96E]/40 text-xs font-montserrat uppercase">smooth journey</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/30"></div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div
          className={`h-80 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border-2 border-dashed border-[#C9A96E]/30 flex items-center justify-center mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <p className="text-[#C9A96E]/60 italic font-cormorant text-lg">Payment Plan Infographic / Illustration</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 text-[#C9A96E] font-montserrat uppercase tracking-wider hover:translate-x-2 transition-all duration-300">
            <span>Explore Payment Structure</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
