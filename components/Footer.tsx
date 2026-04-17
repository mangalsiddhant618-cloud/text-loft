'use client'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#C9A96E] relative">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-cormorant italic text-2xl text-[#C9A96E] mb-2">ASBL LOFT</h3>
            <p className="text-[#A89880] font-lato text-sm leading-relaxed">
              Redefining Luxury in Hyderabad
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat uppercase text-[#FAF7F2] text-sm tracking-wide mb-6">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                { label: 'About', href: '#about' },
                { label: 'Floor Plans', href: '#floor-plans' },
                { label: 'Location', href: '#location' },
                { label: 'Amenities', href: '#amenities' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A89880] hover:text-[#C9A96E] font-lato text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-montserrat uppercase text-[#FAF7F2] text-sm tracking-wide mb-6">
              Connect With Us
            </h4>
            <div className="space-y-4">
              <p className="text-[#A89880] font-lato text-sm">
                <a
                  href="tel:+919876543210"
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  +91 98765 43210
                </a>
              </p>
              <div className="flex gap-4">
                {[
                  { label: 'Facebook', icon: 'f' },
                  { label: 'Instagram', icon: 'I' },
                  { label: 'LinkedIn', icon: 'in' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-8 h-8 rounded-full border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-all text-xs font-bold"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C9A96E]/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A89880] font-montserrat text-xs uppercase tracking-wider">
              © 2024 ASBL Loft. All Rights Reserved.
            </p>
            <div className="flex gap-4 text-[#A89880] font-montserrat text-xs uppercase tracking-wider">
              <a href="#" className="hover:text-[#C9A96E] transition-colors">
                RERA: P02400006761
              </a>
              <span className="text-[#C9A96E]/30">·</span>
              <a href="#" className="hover:text-[#C9A96E] transition-colors">
                Building Permit: GP2024-XYZ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>
    </footer>
  )
}
