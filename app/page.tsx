'use client'

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

// Working Counter Component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, suffix])

  return <p ref={ref} className="text-5xl font-bold mb-2 text-gray-900">0{suffix}</p>
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-300 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src="/logo.svg" 
              alt="Horio" 
              width={28} 
              height={28}
            />
            <span className="text-lg font-semibold tracking-tight text-gray-900">horio</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10 text-sm">
            <motion.a 
              href="#" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Pricing
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Docs
            </motion.a>
          </div>
          <div className="flex items-center gap-4">
            <motion.button 
              className="text-sm text-gray-700 hover:text-black transition-colors font-medium"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Sign in
            </motion.button>
            <motion.button 
              className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Get started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <motion.div 
          style={{ opacity, scale, y }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-full mb-8"
            >
              <motion.span 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-700 font-medium">Launching early 2026</span>
            </motion.div>
            
            <motion.h1 
              className="text-7xl md:text-[120px] font-bold tracking-tight leading-[0.95] mb-8 text-gray-900"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Your village for<br />
              <motion.span 
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                specialized
              </motion.span><br />
              software
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A curated marketplace connecting businesses with the perfect software 
              for healthcare, education, retail, and beyond.
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button 
                className="group bg-black text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                Browse software
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
              <motion.button 
                className="px-8 py-4 rounded-xl text-base font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                List your product
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview - With Browser Chrome, No Hover Animation */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-32 bottom-0 z-10"></div>
            <div className="bg-white rounded-2xl border border-gray-300 shadow-2xl overflow-hidden">
              {/* Browser Chrome - 3 Colored Dots */}
              <div className="border-b border-gray-300 p-4 flex items-center gap-2 bg-gray-50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>
              {/* Dashboard Image */}
              <div className="bg-gradient-to-br from-gray-50 to-white">
                <Image 
                  src="/dashboard.png" 
                  alt="Horio Dashboard Preview" 
                  width={1920} 
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats with Counter Animation */}
      <section className="py-24 px-8 border-y border-gray-300 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -3 }}
              className="text-center cursor-pointer"
            >
              <AnimatedCounter value={50} suffix="+" />
              <p className="text-gray-700 font-medium">Software solutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -3 }}
              className="text-center cursor-pointer"
            >
              <AnimatedCounter value={20} suffix="+" />
              <p className="text-gray-700 font-medium">Categories</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -3 }}
              className="text-center cursor-pointer"
            >
              <AnimatedCounter value={10} suffix="+" />
              <p className="text-gray-700 font-medium">Happy customers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Built for teams that<br />ship software
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Find specialized software curated by industry experts. 
              No noise, just the tools that matter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Healthcare", desc: "Hospital & clinic management", count: "45+" },
              { title: "Education", desc: "Academic & learning platforms", count: "60+" },
              { title: "Retail", desc: "POS & inventory systems", count: "38+" },
              { title: "Restaurant", desc: "Operations & delivery", count: "29+" },
              { title: "Legal", desc: "Practice management", count: "22+" },
              { title: "Manufacturing", desc: "ERP & production tools", count: "41+" }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, borderColor: '#000' }}
                className="group bg-white border-2 border-gray-300 rounded-xl p-8 hover:shadow-2xl transition-all cursor-pointer"
              >
                <motion.div 
                  className="text-sm text-gray-600 mb-3 font-semibold"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {cat.count} solutions
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-black transition-colors">{cat.title}</h3>
                <p className="text-gray-700 font-medium">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-32 px-8 bg-gray-50 border-y border-gray-300">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Three simple steps
          </motion.h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Browse categories", desc: "Explore software organized by your industry" },
              { step: "02", title: "Compare solutions", desc: "Read reviews from real users in the community" },
              { step: "03", title: "Get started", desc: "Purchase and deploy software instantly" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ x: 10 }}
                className="flex gap-8 items-start border-b border-gray-300 pb-12 last:border-0 cursor-pointer"
              >
                <motion.span 
                  className="text-3xl font-bold text-gray-400"
                  whileHover={{ scale: 1.2, color: '#000' }}
                >
                  {item.step}
                </motion.span>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 text-lg font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join the village
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 mb-12 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Be first to know when we launch. Early members get exclusive access.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hello@horio.store?subject=I'm interested in Horio!&body=Hi Horio team,%0D%0A%0D%0AI'm interested in joining the village and getting early access to your software marketplace.%0D%0A%0D%0APlease keep me updated!%0D%0A%0D%0AThanks"
              className="inline-block bg-black text-white px-12 py-5 rounded-xl font-semibold hover:bg-gray-800 transition-all text-lg"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Join the waitlist
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-gray-300 py-12 px-8 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src="/logo.svg" 
              alt="Horio" 
              width={24} 
              height={24}
            />
            <span className="font-semibold text-gray-900">horio</span>
          </motion.div>
          <p className="text-sm text-gray-700 font-medium">© 2025 Horio. Built for software buyers.</p>
        </div>
      </motion.footer>
    </main>
  )
}
