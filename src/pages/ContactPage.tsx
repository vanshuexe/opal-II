import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF8F2]/30 min-h-screen pb-20">
      {/* Contact Header */}
      <section className="bg-[#FAF8F2] py-16 md:py-24 border-b border-[#C99933]/20">
        <div className="max-w-[1150px] mx-auto px-4 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C99933] font-semibold block mb-2">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A1612] leading-tight">
            Get in <span className="italic text-[#C99933]">touch</span> with us
          </h1>
          <p className="text-base text-[#757779] mt-4 leading-relaxed">
            Call, email or visit our studio in Bhayandar East, Thane. Principal Designer <strong>Mansi Sharma</strong> and Partner <strong>Pushapraj Sharma</strong> personally respond to every inquiry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:+917400260508">
              <button className="btnConsultation py-4 px-9 text-xs sm:text-sm inline-flex items-center gap-2">
                <Phone size={16} />
                CALL US NOW
              </button>
            </a>
            <a href="https://wa.me/917400260508" target="_blank" rel="noopener noreferrer">
              <button className="btnGoldOutline py-4 px-9 text-xs sm:text-sm inline-flex items-center gap-2">
                <MessageCircle size={16} />
                WHATSAPP US
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Direct Phone */}
            <div className="p-6 bg-[#FAF8F2] rounded-xl border border-[#C99933]/25 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#C99933] flex items-center justify-center shrink-0 shadow-xs">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#101828] font-sans">Direct Phone</h4>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  <a href="tel:+917400260508" className="hover:text-[#C99933] font-semibold text-sm block">+91 7400260508</a>
                  <span className="text-[10px] text-[#757779]">Mansi Sharma &amp; Pushapraj Sharma</span>
                </p>
              </div>
            </div>

            {/* Official Email */}
            <a
              href="mailto:Opalinterior05@gmail.com"
              className="p-6 bg-[#FAF8F2] rounded-xl border border-[#C99933]/25 shadow-xs flex items-start gap-4 block hover:border-[#C99933] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#C99933] flex items-center justify-center shrink-0 shadow-xs">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#101828] font-sans">Official Email</h4>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed font-medium">
                  Opalinterior05@gmail.com
                </p>
                <span className="text-[10px] text-[#757779]">Client Inquiries &amp; Consultations</span>
              </div>
            </a>

            {/* Address */}
            <div className="p-6 bg-[#FAF8F2] rounded-xl border border-[#C99933]/25 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#C99933] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#101828] font-sans">Studio Address</h4>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  B-112, Shiv Mahal, RNP park, Next to Jesal Park, Bhayandar East, Thane - 401105
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 bg-[#FAF8F2] rounded-xl border border-[#C99933]/25 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#C99933] flex items-center justify-center shrink-0 shadow-xs">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#101828] font-sans">Studio Hours</h4>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Mon - Sat: 10:00 AM - 7:00 PM
                </p>
                <span className="text-[10px] text-[#757779]">Sunday By Appointment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Location Map */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1150px] mx-auto px-4">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#C99933]/25 h-[420px] md:h-[480px] w-full">
            <iframe
              title="Opal Interior Bhayandar East Thane Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.7230482598377!2d72.8580!3d19.3001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b025a1234567%3A0x123456789abcdef0!2sJesal%20Park%2C%20Bhayandar%20East%2C%20Mira%20Bhayandar%2C%20Maharashtra%20401105!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
