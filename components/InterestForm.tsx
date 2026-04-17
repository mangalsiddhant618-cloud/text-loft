'use client'

import { useEffect, useState, useRef } from 'react'

export default function InterestForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: 'morning',
  })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', preferredTime: 'morning' })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-[#F5F0E8]">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-cormorant italic text-5xl md:text-6xl text-[#1A1A1A] mb-4">
            Are you interested in this Property?
          </h2>
          <p className="text-[#A89880] font-montserrat text-sm uppercase tracking-wider">
            Connect with our team for a personalised walkthrough
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Name */}
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wide text-[#1A1A1A] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 bg-white border-2 border-[#C9A96E] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] placeholder-[#A89880]"
                placeholder="Your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wide text-[#1A1A1A] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 bg-white border-2 border-[#C9A96E] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] placeholder-[#A89880]"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wide text-[#1A1A1A] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 bg-white border-2 border-[#C9A96E] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] placeholder-[#A89880]"
                placeholder="your@email.com"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block font-montserrat text-sm uppercase tracking-wide text-[#1A1A1A] mb-2">
                Preferred Time to Call
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-6 py-3 bg-white border-2 border-[#C9A96E] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#C9A96E] text-[#1A1A1A] font-montserrat uppercase tracking-wide hover:bg-[#BFA06A] transition-all duration-300"
            >
              Request a Callback
            </button>

            {/* Reassurance Text */}
            <p className="text-center text-[#A89880] font-lato text-sm">
              No spam. Our team will reach out within 24 hours.
            </p>
          </form>
        ) : (
          <div
            className={`text-center py-12 transition-all duration-1000 ${
              isSubmitted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A96E] mb-6">
              <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-cormorant italic text-3xl text-[#1A1A1A] mb-2">Thank You!</h3>
            <p className="text-[#A89880] font-lato">
              We&apos;ll reach out to you shortly to arrange a personalized walkthrough.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
