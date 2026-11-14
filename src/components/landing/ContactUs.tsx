'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative z-20 w-full max-w-full overflow-hidden bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 font-sans">
      <div className="max-w-[1020px] mx-auto">
        
        {/* MAIN CONTACT CARD (Dark Navy & Electric Blue Radiant Glow) */}
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#060c18] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800/80">
          
          {/* Radiant Diagonal Electric Blue Beam / Sweep */}
          <div 
            className="absolute -bottom-28 -right-20 w-[600px] h-[550px] rounded-full pointer-events-none opacity-85 blur-[70px]"
            style={{
              background: 'radial-gradient(circle at 75% 75%, #1d6ee5 0%, #154fb0 40%, rgba(6, 12, 24, 0) 75%)',
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-[300px] h-[200px] rounded-full pointer-events-none opacity-60 blur-[60px]"
            style={{
              background: 'radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Headings, Call Booking & Social Media */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Script Kicker: Contact Us */}
                <span className="font-serif italic text-slate-300/80 text-sm sm:text-base block mb-2 tracking-wide">
                  Contact Us
                </span>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.12] mb-4">
                  We&apos;re just one <br />
                  message away.
                </h2>

                {/* Subtext */}
                <p className="text-xs sm:text-sm text-slate-300/80 font-normal leading-relaxed max-w-sm sm:max-w-md mb-8">
                  Have questions or ideas? Reach out and we&apos;ll guide you through how ProHub can fit into your sales workflow.
                </p>
              </div>

              <div>
                {/* Call Booking Callout */}
                <div className="mb-6">
                  <span className="font-serif italic text-slate-400 text-xs block mb-1">
                    Prefer a call?
                  </span>
                  <div className="text-xs sm:text-sm text-slate-300">
                    Book 30-mins intro call with us?{' '}
                    <Link
                      href="#book-call"
                      className="font-semibold text-white underline hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                    >
                      Book a Call <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Social Media Links (Per User Request) */}
                <div className="pt-4 border-t border-white/10">
                  <span className="font-serif italic text-blue-200 text-xs sm:text-[13px] block mb-2.5">
                    Stay in touch!
                  </span>
                  <div className="flex items-center gap-2">
                    
                    {/* Discord */}
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Discord"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-sm"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X (Twitter)"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-sm"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-sm"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-sm"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>

                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Floating Clean White Form Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-slate-900 shadow-2xl border border-white/80">
                
                {isSubmitted ? (
                  <div className="py-8 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-900">{formData.firstName}</span>. We&apos;ll be in touch with you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          companyName: '',
                          email: '',
                          message: '',
                        });
                      }}
                      className="px-5 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Write message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button (Black Full Width Button) */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-black hover:bg-slate-800 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] cursor-pointer"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
