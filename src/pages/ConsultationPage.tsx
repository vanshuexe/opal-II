import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Phone, 
  Mail, 
  Home as HomeIcon,
  MessageCircle,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { saveNewInquiry } from '../data/inquiriesStore';

type ConsultationMode = 'studio' | 'onsite' | 'virtual';

export const ConsultationPage: React.FC = () => {
  const [mode, setMode] = useState<ConsultationMode>('studio');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    propertyType: '3 BHK Residence',
    projectStage: 'Ready for Interior Work',
    budget: '₹ 25 Lakhs - 50 Lakhs',
    preferredDate: '',
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
    notes: '',
    vastu: false,
    file: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const modeLabels: Record<ConsultationMode, string> = {
      studio: 'In-Person Studio Visit (Bhayandar East, Thane)',
      onsite: 'On-Site Property Visit (Mumbai / Thane)',
      virtual: 'Virtual Video Call (Google Meet / Zoom)',
    };

    saveNewInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: `Free Consultation [${modeLabels[mode]}] - ${formData.propertyType}${formData.vastu ? ' + Vastu Consultation (Paid Add-On)' : ''}`,
      budget: formData.budget,
      location: formData.location || 'Mumbai / Thane Region',
      message: `Preferred Date: ${formData.preferredDate || 'Flexible'} | Time Slot: ${formData.preferredTime} | Stage: ${formData.projectStage} | Property: ${formData.propertyType} | Vastu Add-On: ${formData.vastu ? 'Yes (additional charges)' : 'No'}. Notes: ${formData.notes || 'None provided'}`,
    });

    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Mansi Sharma & Pushapraj Sharma, I would like to confirm my Free Interior Design Consultation for Opal Interior.\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📍 City/Location: ${formData.location || 'Mumbai'}\n` +
      `🏡 Property: ${formData.propertyType} (${formData.projectStage})\n` +
      `📅 Preferred Date: ${formData.preferredDate || 'Flexible'}\n` +
      `⏰ Time Slot: ${formData.preferredTime}\n` +
      `💼 Consultation Mode: ${mode === 'studio' ? 'Studio Visit' : mode === 'onsite' ? 'Site Visit' : 'Virtual Call'}\n` +
      `💰 Budget Range: ${formData.budget}` +
      (formData.vastu ? `\n🧭 Add-On: Vastu Consultation (additional charges)` : '')
    );
    return `https://wa.me/917400260508?text=${text}`;
  };

  return (
    <div className="w-full bg-[#FAF8F2]/30 min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAF8F2] border-b border-[#C99933]/15 py-3">
        <div className="max-w-[1150px] mx-auto px-4 flex items-center gap-2 text-xs text-[#757779]">
          <Link to="/" className="hover:text-[#C99933] transition-colors flex items-center gap-1">
            <HomeIcon size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#C99933] font-semibold">Free Consultation</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[#FAF8F2] py-14 md:py-20 border-b border-[#C99933]/20 relative">
        <div className="max-w-[1150px] mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C99933]/15 text-[#C99933] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#C99933]/30">
            <Sparkles size={14} />
            <span>Complimentary 45-Min Design Discovery Session</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1612] leading-tight">
            Book Your Free <span className="italic text-[#C99933]">Interior Consultation</span>
          </h1>

          <p className="text-base text-[#757779] mt-4 leading-relaxed">
            Meet 1-on-1 with Principal Designer <strong>Mansi Sharma</strong> and Partner <strong>Pushapraj Sharma</strong> to explore layout possibilities, architectural moodboards, material aesthetics, and a clear budget roadmap for your home.
          </p>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#2C2C2C]">
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-xs">
              <Clock size={14} className="text-[#C99933]" />
              <span>45-Min Dedicated Session</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-xs">
              <Compass size={14} className="text-[#C99933]" />
              <span>Spatial Layout Guidance</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-xs">
              <ShieldCheck size={14} className="text-[#C99933]" />
              <span>100% Free &amp; No Obligation</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#C99933]/25 shadow-xl">
                
                {submitted ? (
                  <div className="text-center py-8 flex flex-col items-center gap-5 animate-fadeIn">
                    <div className="w-20 h-20 rounded-full bg-[#FAF8F2] border-2 border-[#C99933] flex items-center justify-center text-[#C99933] shadow-md">
                      <CheckCircle2 size={44} />
                    </div>

                    <div className="max-w-lg">
                      <span className="text-xs uppercase tracking-widest text-[#C99933] font-bold">
                        Appointment Request Received
                      </span>
                      <h2 className="text-3xl font-serif text-[#1A1612] mt-1 mb-3">
                        We Look Forward to Meeting You!
                      </h2>
                      <p className="text-sm text-[#757779] leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>. Mansi Sharma, Pushapraj Sharma and our core design directors have received your consultation booking for <strong>{formData.propertyType}</strong>.
                      </p>
                    </div>

                    <div className="w-full max-w-md bg-[#FAF8F2] p-5 rounded-2xl border border-[#C99933]/20 text-left text-xs space-y-2 text-[#4A4A4A]">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Contact Number:</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Preferred Date:</span>
                        <span className="font-semibold">{formData.preferredDate || 'To be scheduled'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Preferred Time:</span>
                        <span className="font-semibold">{formData.preferredTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Consultation Format:</span>
                        <span className="font-semibold uppercase text-[#C99933]">
                          {mode === 'studio' ? 'Studio Visit (Bhayandar East)' : mode === 'onsite' ? 'On-Site Property Visit' : 'Virtual Video Call'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full max-w-md">
                      <a 
                        href={getWhatsAppLink()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg transition-all"
                      >
                        <MessageCircle size={17} />
                        <span>Confirm via WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btnGoldOutline py-3.5 px-6 text-xs"
                      >
                        Modify Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* 1. Consultation Format Selector */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-[#1A1612] font-bold block mb-3">
                        Step 1: Choose Consultation Format
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setMode('studio')}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                            mode === 'studio'
                              ? 'border-[#C99933] bg-[#FAF8F2] shadow-sm ring-2 ring-[#C99933]/30'
                              : 'border-stone-200 hover:border-[#C99933]/50 bg-white'
                          }`}
                        >
                          <Building2 size={22} className={mode === 'studio' ? 'text-[#C99933]' : 'text-stone-400'} />
                          <div>
                            <span className="text-sm font-semibold text-[#1A1612] block">Studio Visit</span>
                            <span className="text-[11px] text-[#757779]">Bhayandar East, Thane Studio</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMode('onsite')}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                            mode === 'onsite'
                              ? 'border-[#C99933] bg-[#FAF8F2] shadow-sm ring-2 ring-[#C99933]/30'
                              : 'border-stone-200 hover:border-[#C99933]/50 bg-white'
                          }`}
                        >
                          <MapPin size={22} className={mode === 'onsite' ? 'text-[#C99933]' : 'text-stone-400'} />
                          <div>
                            <span className="text-sm font-semibold text-[#1A1612] block">On-Site Visit</span>
                            <span className="text-[11px] text-[#757779]">At Your Residence / Flat</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMode('virtual')}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                            mode === 'virtual'
                              ? 'border-[#C99933] bg-[#FAF8F2] shadow-sm ring-2 ring-[#C99933]/30'
                              : 'border-stone-200 hover:border-[#C99933]/50 bg-white'
                          }`}
                        >
                          <Video size={22} className={mode === 'virtual' ? 'text-[#C99933]' : 'text-stone-400'} />
                          <div>
                            <span className="text-sm font-semibold text-[#1A1612] block">Virtual Call</span>
                            <span className="text-[11px] text-[#757779]">Google Meet or Zoom</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* 2. Your Contact Information */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-[#1A1612] font-bold block mb-3">
                        Step 2: Your Contact Information
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">WhatsApp / Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">City / Locality *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bandra, Thane, Navi Mumbai"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Project & Space Details */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-[#1A1612] font-bold block mb-3">
                        Step 3: Space &amp; Budget Scope
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Property Type</label>
                          <select
                            value={formData.propertyType}
                            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          >
                            <option>2 BHK Residence</option>
                            <option>3 BHK Residence</option>
                            <option>4 BHK Residence</option>
                            <option>Duplex Penthouse</option>
                            <option>Independent Villa</option>
                            <option>Commercial Office</option>
                            <option>Retail Studio / Showroom</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Project Stage</label>
                          <select
                            value={formData.projectStage}
                            onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          >
                            <option>Ready for Interior Work</option>
                            <option>Possession in 1-3 Months</option>
                            <option>Under Construction</option>
                            <option>Complete Renovation / Remodel</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Estimated Budget</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          >
                            <option>₹ 15 Lakhs - 25 Lakhs</option>
                            <option>₹ 25 Lakhs - 50 Lakhs</option>
                            <option>₹ 50 Lakhs - 1 Crore</option>
                            <option>Above ₹ 1 Crore</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 4. Scheduling Preference */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-[#1A1612] font-bold block mb-3">
                        Step 4: Scheduling Preference
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Preferred Date</label>
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-[#757779] block mb-1">Preferred Time Window</label>
                          <select
                            value={formData.preferredTime}
                            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                          >
                            <option>Morning (10:30 AM - 1:00 PM)</option>
                            <option>Afternoon (2:00 PM - 5:00 PM)</option>
                            <option>Evening (5:00 PM - 7:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Optional Paid Add-On: Vastu Consultation */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.vastu
                          ? 'border-[#C99933] bg-[#FAF8F2] ring-2 ring-[#C99933]/30'
                          : 'border-stone-200 hover:border-[#C99933]/50 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.vastu}
                        onChange={(e) => setFormData({ ...formData, vastu: e.target.checked })}
                        className="mt-1 accent-[#C99933]"
                      />
                      <div>
                        <span className="text-sm font-semibold text-[#1A1612] flex items-center gap-2">
                          <Compass size={16} className="text-[#C99933]" />
                          Add Vastu Consultation
                          <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-[#C99933] px-2 py-0.5 rounded-full">
                            Extra Charges
                          </span>
                        </span>
                        <span className="text-[11px] text-[#757779] block mt-1">
                          Optional paid service — integrate Vastu principles into your interior plan. Charges are shared separately and are not part of the free consultation.{' '}
                          <Link to="/services#vastu-consultation" className="text-[#C99933] underline">
                            See what's included
                          </Link>
                        </span>
                      </div>
                    </label>

                    {/* 5. Additional Vision / Notes */}
                    <div>
                      <label className="text-xs text-[#757779] block mb-1">Tell Us About Your Space (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Share any special preferences (e.g. minimalist aesthetics, Mandir sanctuary, modular kitchen island, Italian marble flooring)..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C99933] text-sm text-[#1A1612] bg-[#FAF8F2]/40"
                      />
                    </div>

                    {/* 6. Optional File Upload */}
                    <div>
                      <label className="text-xs text-[#757779] block mb-1">Attach Floorplan or Photos (Optional, Max 25MB)</label>
                      <div className="border border-dashed border-[#C99933]/50 rounded-xl p-4 bg-[#FAF8F2]/40 text-center cursor-pointer hover:bg-[#FAF8F2] transition-colors">
                        <Upload size={20} className="mx-auto text-[#C99933] mb-1" />
                        <span className="text-xs text-[#757779]">
                          {formData.file ? formData.file.name : 'Click to select DWG, PDF, or JPG floorplan file'}
                        </span>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && setFormData({ ...formData, file: e.target.files[0] })}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btnConsultation w-full py-4 text-sm tracking-wider shadow-xl"
                      >
                        CONFIRM FREE CONSULTATION
                      </button>
                      <p className="text-[11px] text-[#757779] text-center mt-3">
                        By submitting, you agree to receive a confirmation call or WhatsApp from our founders. No spam guaranteed.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Information & FAQs Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Founders Guarantee Card */}
              <div className="bg-[#101828] text-white p-7 rounded-2xl shadow-xl">
                <span className="text-[10px] uppercase tracking-widest text-[#C99933] font-bold block mb-1">
                  DIRECT FOUNDER ENGAGEMENT
                </span>
                <h3 className="text-xl font-serif text-white mb-2">
                  Mansi Sharma &amp; Pushapraj Sharma
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Unlike large commercial interior agencies that pass your project to junior coordinators, every Opal Interior consultation is guided directly by our studio founders.
                </p>
                <div className="space-y-2 pt-3 border-t border-slate-700 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C99933]" />
                    <span>Personalized spatial layout ideas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C99933]" />
                    <span>Honest material &amp; timeline advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#C99933]" />
                    <span>Clear turnkey milestone pricing</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm">
                <h4 className="text-base font-serif font-bold text-[#1A1612] mb-3">
                  What Happens During The Session?
                </h4>
                <ul className="space-y-3 list-none p-0 m-0 text-xs text-[#4A4A4A]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F2] text-[#C99933] font-bold flex items-center justify-center shrink-0 border border-[#C99933]/40 text-[10px]">
                      1
                    </span>
                    <span><strong>Discovery:</strong> We review your architectural floorplan and daily living requirements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F2] text-[#C99933] font-bold flex items-center justify-center shrink-0 border border-[#C99933]/40 text-[10px]">
                      2
                    </span>
                    <span><strong>Visual Direction:</strong> We share 3D moodboard concepts matching your desired aesthetic.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F2] text-[#C99933] font-bold flex items-center justify-center shrink-0 border border-[#C99933]/40 text-[10px]">
                      3
                    </span>
                    <span><strong>Budget Scope:</strong> We outline transparent milestone estimates for turnkey execution.</span>
                  </li>
                </ul>
              </div>

              {/* Direct Founder Contact Box */}
              <div className="bg-[#FAF8F2] p-6 rounded-2xl border border-[#C99933]/30">
                <h4 className="text-sm font-serif font-bold text-[#1A1612] mb-2">
                  Need Immediate Help?
                </h4>
                <p className="text-xs text-[#757779] mb-4">
                  Speak directly with Mansi or Pushapraj today for urgent inquiries or site visits:
                </p>
                <div className="space-y-2 text-xs">
                  <a href="tel:+917400260508" className="flex items-center gap-2 text-[#1A1612] font-semibold hover:text-[#C99933] transition-colors">
                    <Phone size={14} className="text-[#C99933]" />
                    <span>+91 7400260508</span>
                  </a>
                  <a href="mailto:Opalinterior05@gmail.com" className="flex items-center gap-2 text-[#757779] hover:text-[#C99933] transition-colors">
                    <Mail size={14} className="text-[#C99933]" />
                    <span>Opalinterior05@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-2 text-slate-500 pt-1">
                    <MapPin size={14} className="text-[#C99933] shrink-0 mt-0.5" />
                    <span>B-112, Shiv Mahal, RNP park, Bhayandar East, Thane - 401105</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Explore Our Work Bottom Banner */}
      <section className="py-12 bg-white border-t border-stone-200">
        <div className="max-w-[1150px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-serif text-[#1A1612]">
              Want to see our completed projects first?
            </h3>
            <p className="text-xs text-[#757779] mt-0.5">
              Explore our contemporary 3D specification boards and completed residences across Mumbai.
            </p>
          </div>
          <Link to="/work">
            <button className="btnGoldOutline text-xs py-3.5 px-7 inline-flex items-center gap-2">
              <span>View Portfolio</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
