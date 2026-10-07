import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  UserCheck, 
  Layers, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Award, 
  Eye, 
  HeartHandshake, 
  Clock, 
  ArrowRight,
  Home as HomeIcon
} from 'lucide-react';
import { MarqueeBanner } from '../components/MarqueeBanner';

export const AboutPage: React.FC = () => {
  const stats = [
    { number: '2019', label: 'Founded in Mumbai' },
    { number: '150+', label: 'Curated Residences & Spaces' },
    { number: '100%', label: 'Bespoke Craftsmanship' },
    { number: '1', label: 'Seamless Design Experience' },
  ];

  const coreServices = [
    'Interior Architecture',
    'Spatial Planning',
    'Material Selection',
    'Bespoke Detailing',
    'Design Management',
    'On-Site Supervision',
    'Private Residences',
    'Sophisticated Commercial Environments',
  ];

  const designProcess = [
    {
      step: '01',
      title: 'Consultation & Lifestyle Brief',
      desc: 'We start by listening deeply to understand how you live, work, and entertain. We analyze natural light, spatial layout, and your aesthetic aspirations.',
    },
    {
      step: '02',
      title: 'Concept & 3D Spatial Renders',
      desc: 'Our studio translates ideas into tangible 3D visualizations, curated color palettes, lighting schemes, and detailed room-by-room presentation boards.',
    },
    {
      step: '03',
      title: 'Material Curation & Working Drawings',
      desc: 'From Italian marble and bespoke fluted joinery to warm brass accents and textiles, every physical finish is handpicked alongside technical schematics.',
    },
    {
      step: '04',
      title: 'Turnkey Execution & Site Handover',
      desc: 'Pushapraj Sharma and our dedicated site management team supervise on-ground execution with millimeter precision, delivering a flawless turnkey move-in experience.',
    },
  ];

  const studioValues = [
    {
      icon: <Award className="text-[#C99933]" size={26} />,
      title: 'Bespoke Individuality',
      desc: 'No repetitive templates. Every residence reflects the personal identity and functional rhythm of its residents.',
    },
    {
      icon: <ShieldCheck className="text-[#C99933]" size={26} />,
      title: 'Turnkey Accountability',
      desc: 'From civil modifications and false ceilings to furniture styling and final handover, we take total ownership.',
    },
    {
      icon: <Eye className="text-[#C99933]" size={26} />,
      title: 'Meticulous Materiality',
      desc: 'Curated premium veneers, imported marbles, tactile fabrics, and custom hardware sourced with discerning eyes.',
    },
    {
      icon: <Clock className="text-[#C99933]" size={26} />,
      title: 'On-Time Milestone Delivery',
      desc: 'Structured scheduling and transparent project milestones ensure seamless execution without unexpected delays.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F2]/30">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAF8F2] border-b border-[#C99933]/15 py-3">
        <div className="max-w-[1150px] mx-auto px-4 flex items-center gap-2 text-xs text-[#757779]">
          <Link to="/" className="hover:text-[#C99933] transition-colors flex items-center gap-1">
            <HomeIcon size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#C99933] font-semibold">About Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#FAF8F2] py-16 md:py-24 border-b border-[#C99933]/20 relative overflow-hidden">
        <div className="max-w-[1150px] mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C99933]/15 text-[#C99933] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#C99933]/30">
                <Sparkles size={14} />
                <span>About OPAL INTERIOR Studio</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1612] leading-[1.15]">
                Creating <span className="text-[#C99933]">refined, contemporary</span> spaces that are deeply personal and timeless
              </h1>
            </div>
            <div className="border-l-2 border-[#C99933] pl-6 text-[#757779] max-w-md lg:self-end pb-2">
              <p className="text-sm md:text-base leading-relaxed">
                A Mumbai-based interior architecture and design studio founded in 2019 by Interior Designer <strong>Mansi Sharma</strong> and her Partner <strong>Pushapraj Sharma</strong>.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-[#1A1612]">
                <span className="flex items-center gap-1.5 text-[#C99933]">
                  <MapPin size={15} />
                  <span>Mumbai &amp; Thane Studio</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#757779]">
                  <Clock size={15} />
                  <span>Est. 2019</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story & Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C99933] font-semibold">
                Our Story &amp; Design Philosophy
              </span>

              <p className="text-xl md:text-2xl text-[#090B19] font-serif leading-relaxed italic border-l-4 border-[#C99933] pl-4">
                "OPAL INTERIOR is a Mumbai-based interior design studio creating refined, contemporary spaces that are deeply personal and timeless."
              </p>

              <div className="space-y-4 text-base text-[#757779] leading-relaxed">
                <p>
                  We believe luxury is not simply about beautiful materials or striking aesthetics. It is about thoughtful details, exceptional craftsmanship, and creating spaces that feel effortlessly comfortable, purposeful, and uniquely yours.
                </p>
                <p>
                  From private residences and duplex penthouses to sophisticated commercial environments, we offer a seamless design experience, bringing together interior architecture, spatial planning, material selection, bespoke detailing, design management, and on-site supervision. Every project is approached with meticulous attention to proportion, functionality, texture, light, and the individual character of the space.
                </p>
                <p>
                  Founded in 2019 by Interior Designer <strong>Mansi Sharma</strong> with her Partner <strong>Pushapraj Sharma</strong>, OPAL INTERIOR has evolved into a premier practice driven by creativity, precision, and a deep understanding of contemporary lifestyles across Mumbai and Thane.
                </p>
                <p>
                  For us, every project is an opportunity to create something personal. We work closely with our clients from the earliest concept to the final detail, transforming their aspirations into spaces that are sophisticated, inviting, and enduring.
                </p>
                <p className="text-[#1A1612] font-semibold font-serif text-lg pt-2">
                  At OPAL INTERIOR, we don't simply design interiors. We create experiences, shaped around the way you live, work, and feel.
                </p>
              </div>

              {/* Founders Feature Card */}
              <div className="mt-4 p-6 rounded-2xl bg-[#FAF8F2] border border-[#C99933]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#1A1612]">Leadership &amp; Studio Founders</h4>
                  <p className="text-sm text-[#C99933] font-semibold mt-0.5">
                    Mansi Sharma <span className="text-[#757779] font-normal">(Principal Interior Designer)</span> &amp; Pushapraj Sharma <span className="text-[#757779] font-normal">(Managing Partner)</span>
                  </p>
                  <p className="text-xs text-[#757779] mt-1">Established 2019 in Mumbai, Maharashtra</p>
                </div>
                <div className="shrink-0">
                  <Link to="/consultation">
                    <button className="btnConsultation text-xs py-2.5 px-6">
                      BOOK FREE CONSULTATION
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Visual & Services Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                  alt="OPAL INTERIOR Studio Execution"
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-xs font-serif italic text-slate-100 leading-relaxed">
                    "Every project is an opportunity to create something personal, shaped around the way you live, work, and feel."
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#FFEFA2] mt-2 font-sans font-semibold">
                    Mansi Sharma &amp; Pushapraj Sharma
                  </p>
                  <p className="text-[10px] text-slate-300">Co-Founders, OPAL INTERIOR</p>
                </div>
              </div>

              {/* Comprehensive Offering Card */}
              <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#C99933]/30">
                <h3 className="text-xl font-serif text-[#1A1612] mb-2">The Seamless Opal Experience</h3>
                <p className="text-xs text-[#757779] mb-4">Complete turnkey interior services under one roof:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {coreServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#2C2C2C]">
                      <Sparkles size={14} className="text-[#C99933] shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Spotlight Section */}
      <section className="py-20 bg-[#FAF8F2] border-y border-[#C99933]/20">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C99933] font-semibold block mb-2">
              Studio Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1612]">
              Meet The Founders Behind OPAL INTERIOR
            </h2>
            <p className="text-sm text-[#757779] mt-3">
              Combining creative interior architecture with rigorous on-ground execution precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder 1: Mansi Sharma */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#C99933]/25 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#C99933] font-semibold bg-[#C99933]/15 px-3 py-1 rounded-full border border-[#C99933]/30">
                    Principal Interior Designer
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Founder</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1612] mb-1">
                  Mansi Sharma
                </h3>
                <p className="text-xs text-[#C99933] font-sans uppercase tracking-wider mb-4 font-semibold">
                  Creative Direction, Spatial Architecture &amp; Aesthetics
                </p>
                <p className="text-sm text-[#666666] leading-relaxed mb-4">
                  Leading the design soul of the studio, Mansi brings an innate sensitivity to spatial flow, natural light, material balance, and custom joinery. She personally directs the conceptual blueprint for every client project, tailoring layouts that are visually stunning and deeply intuitive for daily life.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Bespoke residential concepts &amp; luxury moodboards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Curated palettes: Italian marble, veneers &amp; brass</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Turnkey space planning for modern urban living</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-[#757779] italic font-serif">"Every home should tell its family's story."</span>
                <Link to="/contact" className="text-xs font-semibold text-[#C99933] hover:underline flex items-center gap-1">
                  <span>Inquire with Mansi</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Founder 2: Pushapraj Sharma */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#C99933]/25 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#C99933] font-semibold bg-[#C99933]/15 px-3 py-1 rounded-full border border-[#C99933]/30">
                    Managing Partner
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Co-Founder</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1612] mb-1">
                  Pushapraj Sharma
                </h3>
                <p className="text-xs text-[#C99933] font-sans uppercase tracking-wider mb-4 font-semibold">
                  Execution Management, Site Supervision &amp; Quality Control
                </p>
                <p className="text-sm text-[#666666] leading-relaxed mb-4">
                  Overseeing on-site execution, engineering precision, and vendor craftsmanship, Pushapraj ensures that every 3D visualization and architectural drawing translates into flawless physical reality. His disciplined site governance guarantees millimeter precision and turnkey delivery on schedule.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Rigorous on-site contractor &amp; carpenter supervision</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Material quality assurance &amp; structural detailing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2C2C2C]">
                    <CheckCircle2 size={15} className="text-[#C99933] shrink-0" />
                    <span>Transparent budget tracking &amp; on-time milestones</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-[#757779] italic font-serif">"Craftsmanship without compromise."</span>
                <Link to="/contact" className="text-xs font-semibold text-[#C99933] hover:underline flex items-center gap-1">
                  <span>Inquire with Pushapraj</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter */}
      <section className="py-16 bg-[#C99933] text-white shadow-inner">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-serif font-bold text-[#FFFDF9]">
                  {s.number}
                </span>
                <span className="text-xs uppercase tracking-widest font-sans opacity-95">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Step Design & Execution Process */}
      <section className="py-20 bg-white">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C99933] font-semibold block mb-2">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1612]">
              Our Proven 4-Step Turnkey Journey
            </h2>
            <p className="text-sm text-[#757779] mt-3">
              From the initial consultation to the celebratory handover of your dream home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designProcess.map((proc) => (
              <div key={proc.step} className="p-7 rounded-2xl bg-[#FAF8F2] border border-[#C99933]/25 relative flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <span className="text-3xl font-serif font-bold text-[#C99933] block mb-3 opacity-90">
                    {proc.step}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1A1612] mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-[#757779] leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Design Pillars */}
      <section className="py-20 bg-[#FAF8F2] border-t border-[#C99933]/20">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C99933] font-semibold block mb-2">
              Our Core Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1612]">
              Precision, Proportion &amp; Personal Character
            </h2>
            <p className="text-sm text-[#757779] mt-3">
              Designing interiors that balance aesthetics with uncompromised comfort and functional order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#C99933]/25 flex flex-col gap-3 shadow-xs">
              <Compass className="text-[#C99933]" size={32} />
              <h3 className="text-xl font-serif text-[#1A1612]">Spatial Planning &amp; Proportion</h3>
              <p className="text-xs text-[#757779] leading-relaxed">
                Meticulous attention to spatial flow, light orientation, and natural proportions ensures every room feels open, purposeful, and harmonious.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#C99933]/25 flex flex-col gap-3 shadow-xs">
              <Layers className="text-[#C99933]" size={32} />
              <h3 className="text-xl font-serif text-[#1A1612]">Bespoke Detailing &amp; Texture</h3>
              <p className="text-xs text-[#757779] leading-relaxed">
                Custom joinery, curated natural stones, rich textiles, and architectural metalwork harmonized to create tactile luxury.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#C99933]/25 flex flex-col gap-3 shadow-xs">
              <UserCheck className="text-[#C99933]" size={32} />
              <h3 className="text-xl font-serif text-[#1A1612]">On-Site Supervision</h3>
              <p className="text-xs text-[#757779] leading-relaxed">
                From initial 3D design concept to on-site execution supervision, we ensure absolute fidelity to the design intent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Values & Commitments */}
      <section className="py-20 bg-white border-t border-[#090B19]/10">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-stone-200 bg-[#FAF8F2]/60 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F2] border border-[#C99933]/30 flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A1612]">{val.title}</h4>
                <p className="text-xs text-[#757779] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Studio Location & Founders Contact Card */}
      <section className="py-16 bg-[#FAF8F2]">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="p-8 md:p-12 rounded-2xl bg-[#101828] text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C99933] font-semibold block mb-2">
                Visit Our Studio
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                Experience Opal Interior Firsthand
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                B-112, Shiv Mahal, RNP park, Next to Jesal Park, Bhayandar East, Thane - 401105, Maharashtra, India.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <a href="tel:+917400260508" className="flex items-center gap-2 hover:text-[#FFEFA2] transition-colors">
                  <Phone size={15} className="text-[#C99933]" />
                  <span>+91 7400260508</span>
                </a>
                <span className="text-slate-500">•</span>
                <span>Mansi Sharma &amp; Pushapraj Sharma</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <Link to="/consultation">
                <button className="btnConsultation py-4 px-8 text-xs sm:text-sm">
                  BOOK FREE CONSULTATION
                </button>
              </Link>
              <Link to="/work">
                <button className="btnGoldOutline border-white text-white hover:bg-[#C99933] hover:border-[#C99933] py-4 px-6 text-xs">
                  VIEW OUR PORTFOLIO
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1150px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A1612] mb-6">
            Ready to design a <span className="text-[#C99933]">space uniquely yours</span>?
          </h2>
          <p className="text-base text-[#757779] max-w-xl mx-auto mb-8">
            Schedule a design consultation with Mansi Sharma, Pushapraj Sharma and the OPAL INTERIOR team in Mumbai.
          </p>
          <Link to="/consultation">
            <button className="btnConsultation py-4 px-10 text-sm">
              BOOK FREE CONSULTATION
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
