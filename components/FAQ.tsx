'use client'

import { useEffect, useState, useRef } from 'react'

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
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

  const faqs = [
    {
      question: 'What is ASBL Loft and why is it considered a top 3BHK project?',
      answer:
        'ASBL Loft is a luxury residential tower offering premium 3BHK apartments in Financial District, Gachibowli. It is considered top-tier due to its prime location, superior design, ASBL\'s signature Outdoor Living balcony, world-class amenities spanning 55,000+ sq. ft., and RERA-approved status. The project promises a lifestyle unmatched in the region.',
    },
    {
      question: 'Where is ASBL Loft located and what is the connectivity?',
      answer:
        'ASBL Loft is situated in Nanakramguda, Financial District, Gachibowli, Hyderabad. It offers seamless connectivity to Amazon, Microsoft, Wipro offices, easy access to ORR, ISB Road, Wipro Circle, and proximity to top schools, hospitals, and shopping centers. Perfect for IT professionals and families seeking premium urban living.',
    },
    {
      question: 'What apartment sizes are available?',
      answer:
        'ASBL Loft offers two carefully designed layouts: Type A (1,695 sq. ft.) and Type B (1,870 sq. ft.). Both feature expansive 3 bedrooms, 2 bathrooms, modular kitchen, and the signature Outdoor Living balcony—providing flexibility and spaciousness for modern living.',
    },
    {
      question: 'What are nearby residential projects?',
      answer:
        'The Financial District area hosts several premium residential projects. ASBL Loft stands out with its prime location, superior architecture, exceptional amenities (55,000 sq. ft. clubhouse), and assured rental benefits. It is positioned as the most sought-after address in Gachibowli.',
    },
    {
      question: 'Does ASBL Loft offer any assured rental benefit?',
      answer:
        'Yes! ASBL Loft offers an assured rental income benefit of ₹85,000 per month until December 2026 (project possession), providing a steady passive income stream for investors. This makes it an attractive investment opportunity in addition to a premium residence.',
    },
  ]

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0F0F0E]">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2
          className={`font-cormorant italic text-5xl md:text-6xl text-[#FAF7F2] text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-[#C9A96E]/30 transition-all duration-1000 ${
                isVisible ? `opacity-100 translate-y-0 delay-${(idx + 1) * 100}` : 'opacity-0 translate-y-10'
              }`}
            >
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 hover:bg-[#1A1A1A]/50 transition-colors duration-300 group"
              >
                <h3 className="font-lato text-[#FAF7F2] text-left text-lg group-hover:text-[#C9A96E] transition-colors">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-[#C9A96E] flex-shrink-0 ml-4 transition-transform duration-300 ${
                    expandedIdx === idx ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Answer */}
              {expandedIdx === idx && (
                <div className="px-6 pb-6 border-t border-[#C9A96E]/20 animate-fadeInUp">
                  <p className="text-[#A89880] font-lato leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
