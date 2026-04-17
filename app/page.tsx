'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PaymentPlan from '@/components/PaymentPlan'
import FloorPlans from '@/components/FloorPlans'
import Location from '@/components/Location'
import Amenities from '@/components/Amenities'
import InterestForm from '@/components/InterestForm'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-[#FAF7F2]">
      <Header />
      <Hero />
      <About />
      <PaymentPlan />
      <FloorPlans />
      <Location />
      <Amenities />
      <InterestForm />
      <FAQ />
      <Footer />
    </main>
  )
}
