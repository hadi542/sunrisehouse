/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Sun, ChevronRight, Star, 
  MapPin, Home, Key, ShieldCheck, FileText, 
  Wallet, Layers, ArrowUpRight, MessageCircle,
  Instagram, Facebook, Linkedin, Youtube,
  TrendingUp, Search, CheckCircle2, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Data ---

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Properties', href: '#properties' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Areas', href: '#areas' },
  { name: 'Insights', href: '#insights' },
  { name: 'Contact', href: '#contact' }
];

const SERVICES = [
  { 
    title: 'Property Buying & Selling', 
    desc: 'Seamless transactions for premium homes and land across Hyderabad.',
    icon: <Home className="w-6 h-6" />
  },
  { 
    title: 'Rental & Leasing', 
    desc: 'Expert management for property owners and ideal spaces for tenants.',
    icon: <Key className="w-6 h-6" />
  },
  { 
    title: 'Home Loans & Finance', 
    desc: 'Hassle-free financial assistance with top banking partners.',
    icon: <Wallet className="w-6 h-6" />
  },
  { 
    title: 'Legal & Registration', 
    desc: 'End-to-end support for documentation and property registration.',
    icon: <FileText className="w-6 h-6" />
  },
  { 
    title: 'Property Valuation', 
    desc: 'Accurate market assessments using deep local data and expertise.',
    icon: <Search className="w-6 h-6" />
  },
  { 
    title: 'Interior Consultation', 
    desc: 'Transforming houses into luxury homes with curated design advice.',
    icon: <Layers className="w-6 h-6" />
  }
];

const PROPERTIES = [
  {
    id: 1,
    title: 'Skyline Penthouse',
    location: 'Hitech City',
    type: 'Apartments',
    price: '₹ 8.5 Cr',
    bhk: '4 BHK',
    sqft: '4,200 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'Emerald Vista Villa',
    location: 'Banjara Hills',
    type: 'Villas',
    price: '₹ 15.2 Cr',
    bhk: '5 BHK',
    sqft: '6,500 sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'The Courtyard Estate',
    location: 'Jubilee Hills',
    type: 'Independent Houses',
    price: '₹ 12.0 Cr',
    bhk: '4 BHK',
    sqft: '3,800 sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 4,
    title: 'Modern Terrace Living',
    location: 'Gachibowli',
    type: 'Apartments',
    price: '₹ 4.2 Cr',
    bhk: '3 BHK',
    sqft: '2,400 sq.ft',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 5,
    title: 'Riverfront Plots',
    location: 'Kokapet',
    type: 'Plots',
    price: '₹ 75 Lakhs+',
    bhk: 'N/A',
    sqft: '2,400 sq.yd',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 6,
    title: 'Corporate Suites',
    location: 'Madhapur',
    type: 'Commercial',
    price: '₹ 11.5 Cr',
    bhk: 'Commercial',
    sqft: '8,000 sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  }
];

const LOCALITIES = [
  { name: 'Banjara Hills', image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=600' },
  { name: 'Jubilee Hills', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Hitech City', image: '/regenerated_image_1777477455708.png' },
  { name: 'Gachibowli', image: '/regenerated_image_1777477645552.png' },
  { name: 'Kondapur', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kokapet', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600' }
];

const REVIEWS = [
  { name: 'Rahul Sharma', text: 'Sunrise Real Estate made our villa purchase in Banjara Hills incredibly smooth. Their transparency is unmatched.', rating: 5 },
  { name: 'Anjali Reddy', text: 'Professional team with deep local knowledge. Highly recommended for property registration support.', rating: 4 },
  { name: 'Karthik V.', text: 'Expert guidance on home loans saved us a lot of time. Truly end-to-end service.', rating: 5 },
  { name: 'Sana Shaikh', text: 'Found a great office space in Hitech City through them. Very efficient process.', rating: 3 },
  { name: 'Vikram Singh', text: 'Helpful team, though the search took longer than expected. Good local network.', rating: 4 },
  { name: 'Deepika M.', text: 'The interior consultation was a huge plus after our purchase. Stunning results!', rating: 5 }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-brand-gold rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="w-5 h-5 bg-brand-black rounded-full mt-3"></div>
          </div>
          <span className="text-xl font-semibold tracking-tighter uppercase">Sunrise <span className="font-light gold-accent">Real Estate</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} className="text-[11px] font-medium hover:text-brand-gold hover:tracking-widest transition-all tracking-[0.2em] uppercase opacity-70 hover:opacity-100">{link.name}</a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="text-[11px] font-mono gold-accent tracking-widest">
            097004 14919
          </div>
          <button className="px-6 py-2.5 bg-brand-gold text-brand-black text-[10px] uppercase font-bold tracking-[0.2em] rounded-sm hover:bg-white transition-colors">
            List Property
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-brand-black z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold">SUNRISE</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-light hover:text-brand-beige transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-brand-beige mb-4 text-xl">097004 14919</p>
              <button className="w-full bg-brand-beige text-brand-black py-4 rounded-xl font-bold uppercase tracking-widest">
                List Your Property
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-[1px] bg-brand-gold"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] gold-accent font-semibold">Hyderabad's Premium Brokerage</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light leading-[0.9] mb-8 tracking-tighter">
            Illuminating Your Path to <span className="italic font-serif gold-accent">Perfect Homes</span>
          </h1>
          <p className="text-base text-white/50 mb-12 font-light tracking-wide leading-relaxed">
            Transparent • Expert • Trusted. We specialize in high-end villas, luxury apartments, and strategic commercial plots across Hyderabad's most coveted zip codes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button className="bg-white text-brand-black px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-brand-gold transition-colors">
              Explore Properties
            </button>
            <button className="border border-white/20 hover:border-white px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] transition-all">
              Consultation
            </button>
          </div>
          
          <div className="flex gap-12 mt-20 pt-12 border-t border-white/10">
            <div className="stat-card">
              <p className="text-3xl font-light mb-1">500+</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Sold Properties</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl font-light mb-1">15+</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Localities</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl font-light mb-1">4.0</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Google Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ subtitle, title, centered = false }: { subtitle: string, title: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[.4em] mb-4 block">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
      {title}
    </h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeading 
            subtitle="Our Philosophy" 
            title="Integrity in Every square foot" 
          />
          <div className="space-y-6 text-white/50 font-light leading-relaxed text-sm">
            <p>
              Founded on the principles of absolute transparency and deep local expertise, Sunrise Real Estate is Hyderabad's premier brokerage for discerning clients seeking excellence.
            </p>
            <p>
              Our practitioners navigate the complexities of Hitech City's architecture to the heritage estates of Jubilee Hills with a singular focus: your legacy.
            </p>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8 mt-10">
              {[
                "15+ Core Localities",
                "End-to-End Registration",
                "Institutional Vetting",
                "Proprietary Network"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative group p-4">
          <div className="absolute inset-0 border border-brand-gold/10 rounded-sm -z-10 group-hover:inset-2 transition-all duration-700" />
          <img 
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200" 
            alt="Office" 
            className="rounded-sm object-cover aspect-[4/5] w-full"
          />
          <div className="absolute -bottom-6 -left-6 bg-brand-gold text-brand-black p-8 rounded-sm shadow-2xl hidden lg:block">
            <p className="text-4xl font-light mb-1">4.0</p>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-70">Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-bg-accent/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-12">
        <SectionHeading 
          subtitle="Core Expertise" 
          title="Bespoke Real Estate Services" 
          centered 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 border border-white/5 rounded-sm hover:border-brand-gold/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-sm mb-8 group-hover:bg-brand-gold group-hover:text-brand-black transition-all">
                {s.icon}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4">{s.title}</h3>
              <p className="text-white/40 text-[11px] leading-relaxed mb-6 font-light uppercase tracking-wider">
                {s.desc}
              </p>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2 group-hover:gap-3 transition-all">
                Details <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProperties = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? PROPERTIES : PROPERTIES.filter(p => p.type === filter);

  const categories = ['All', 'Apartments', 'Villas', 'Plots', 'Commercial'];

  return (
    <section id="properties" className="py-24 bg-brand-bg-accent">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <SectionHeading 
            subtitle="The Collection" 
            title="Featured Portfolio" 
          />
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-16">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all
                  ${filter === cat ? 'bg-brand-gold text-brand-black' : 'bg-white/5 hover:bg-white/10 uppercase'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={p.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-6">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-all duration-700" 
                  />
                  <div className="absolute top-4 left-4 glass px-4 py-2 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                    {p.type}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2 px-1">
                  <h4 className="text-[14px] font-semibold tracking-wide uppercase">{p.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] px-1">
                  {p.location} • {p.bhk} • {p.sqft}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-20 text-center">
          <button className="border border-white/5 py-4 px-12 text-[10px] font-bold uppercase tracking-[.3em] hover:bg-white hover:text-brand-black transition-all rounded-sm">
            See All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

const AreasCovered = () => {
  return (
    <section id="areas" className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          subtitle="Location Intelligence" 
          title="Prime Localities in Hyderabad" 
          centered 
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LOCALITIES.map(area => (
            <div key={area.name} className="relative group overflow-hidden rounded-xl h-48 cursor-pointer">
              <img 
                src={area.image} 
                alt={area.name} 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs font-bold uppercase tracking-widest drop-shadow-md">{area.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section className="py-24 bg-brand-bg-accent">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-12">
          <div className="lg:col-span-1">
            <SectionHeading 
              subtitle="The Feedback" 
              title="Client Testimonials" 
            />
            <div className="glass p-10 rounded-sm border border-white/5">
              <div className="flex gap-1 mb-6 gold-accent">
                {[1,2,3,4].map(i => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                <Star className="w-4 h-4 opacity-20" />
              </div>
              <p className="text-5xl font-light mb-2">4.0</p>
              <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-8 font-semibold leading-tight">Authentic Google Search Rating</p>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest gold-accent underline underline-offset-8">
                View All 312 Reviews
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="bg-brand-black p-8 rounded-sm border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
                <p className="text-white/50 text-[13px] font-light leading-relaxed mb-8 italic tracking-wide lowercase first-letter:uppercase">"{rev.text}"</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <h5 className="font-bold text-[11px] uppercase tracking-widest mb-1">{rev.name}</h5>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest">Verified Owner</p>
                  </div>
                  <div className="text-[10px] font-mono gold-accent">0{i+1}.26</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-gray/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-brand-black p-10 rounded-3xl border border-white/5">
          <SectionHeading subtitle="Get in Touch" title="Consult With Us" />
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="FULL NAME" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-beige outline-none transition-colors text-xs font-bold tracking-widest" />
              <input type="tel" placeholder="PHONE" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-beige outline-none transition-colors text-xs font-bold tracking-widest" />
            </div>
            <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-beige outline-none transition-colors text-xs font-bold tracking-widest" />
            <select 
              defaultValue=""
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-beige outline-none transition-colors text-xs font-bold tracking-widest appearance-none text-white/40"
            >
              <option disabled value="">I AM LOOKING TO...</option>
              <option>BUY PROPERTY</option>
              <option>SELL PROPERTY</option>
              <option>RENT / LEASE</option>
            </select>
            <textarea placeholder="YOUR MESSAGE" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-brand-beige outline-none transition-colors text-xs font-bold tracking-widest"></textarea>
            <button className="w-full bg-brand-beige text-brand-black py-5 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-100 transition-all">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="flex flex-col justify-between py-6">
          <div>
            <SectionHeading subtitle="Location" title="Visit Our Office" />
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-beige/10 flex items-center justify-center rounded-lg text-brand-beige">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-widest mb-1">Corporate Address</h6>
                  <p className="text-white/60 font-light">Metro Pillar No. 1-1-213, Chikkadpalli Rd,<br />Near Chandana Brothers, Hyderabad 500020</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-beige/10 flex items-center justify-center rounded-lg text-brand-beige">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-widest mb-1">Call Us</h6>
                  <p className="text-white/60 font-light">097004 14919</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 rounded-3xl overflow-hidden h-72 border border-white/10 grayscale contrast-125 opacity-70">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977990000001%3A0x7d0a0a0a0a0a0a0a!2sSunrise%20Real%20Estate!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-12 px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-brand-gold rounded-full" />
          <span className="text-[14px] font-bold tracking-widest uppercase">Sunrise </span>
        </div>
        
        <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-medium text-center md:text-left">
          Metro Pillar 213, Chikkadpalli Rd, Hyderabad 500020
        </p>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-[9px] uppercase font-bold gold-accent tracking-widest">WhatsApp Support</span>
          </div>
          <p className="text-[9px] text-white/20 tracking-[.2em] font-medium uppercase truncate">© 2026 SUNRISE REAL ESTATE</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-sans antialiased text-white selection:bg-brand-gold selection:text-brand-black overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <FeaturedProperties />
        <AreasCovered />
        <Reviews />
        
        {/* Insights Teaser */}
        <section id="insights" className="py-24 bg-brand-black">
          <div className="max-w-7xl mx-auto px-12">
            <SectionHeading subtitle="Market Intelligence" title="The Sunrise Insights" centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { date: 'MAY 2026', title: 'Hyderabad Market Trends 2026', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600' },
                { date: 'JUN 2026', title: 'Best Areas for Long-term Investment', img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600' },
                { date: 'JUL 2026', title: 'Your Checklist for First-time Buying', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600' }
              ].map((blog, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-video mb-6 transition-all duration-700 rounded-sm">
                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <p className="text-brand-gold text-[9px] font-bold uppercase tracking-[.3em] mb-2">{blog.date}</p>
                  <h4 className="text-[14px] font-semibold tracking-wider uppercase group-hover:text-brand-gold transition-colors">{blog.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-brand-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
