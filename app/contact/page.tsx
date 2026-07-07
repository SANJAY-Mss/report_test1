"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/landing/deflexai/Navbar';
import { motion } from 'motion/react';
import { Mail, MessageSquare, BookOpen, Loader2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '28857f40-c7e4-46a4-8a1f-b325f766cff4',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Form Message',
          message: formData.message,
          from_name: 'ReportGuard Contact Form',
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-cyan-500/30">
      <Navbar />

      <section className="pt-32 pb-28 px-4 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="mono text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
            <span>[ CONTACT ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span className="text-cyan-400">SUPPORT SYSTEMS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed font-mono text-sm max-w-xl mx-auto">
            Have a question, feedback, or need help? Fill out the form below and we'll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* ── Left: Contact Info ── */}
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            {/* Card 1: Email */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 hover:border-[#2a2a2a] transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-11 h-11 bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-2 mono tracking-wider uppercase text-sm">Email us</h3>
              <p className="text-sm text-gray-500 mb-4 font-mono">We typically reply within 24 hours.</p>
              <a href="mailto:kittyismystery@gmail.com" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors font-mono">
                kittyismystery@gmail.com
              </a>
            </div>


          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            className="md:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 space-y-6"
            >
              <h3 className="font-bold text-white mb-6 mono tracking-wider uppercase flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
                Transmission Log
              </h3>

              {/* Success / Error banners */}
              {status === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 text-sm font-medium flex items-center gap-3 mono">
                  <span className="text-lg">✓</span> MESSAGE SENT SUCCESSFULLY
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-sm font-medium flex items-center gap-3 mono">
                  <span className="text-lg">!</span> {errorMsg.toUpperCase()}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mono">
                    Your name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mono">
                    Email address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mono">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm appearance-none"
                >
                  <option value="">Select a topic…</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="University Partnership">University Partnership</option>
                  <option value="Billing & Pricing">Billing & Pricing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 mono">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 text-sm font-bold text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 mono tracking-wider uppercase flex items-center justify-center gap-3 mt-4"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  'INITIATE CONTACT'
                )}
              </button>

              <div className="pt-4 border-t border-[#1a1a1a] flex justify-between items-center text-xs text-gray-500 mono">
                <span>// ENCRYPTED CONNECTION</span>
                <span>SECURE</span>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="border-t border-[#1a1a1a] py-8 text-center text-sm font-mono text-gray-500 tracking-wider">
        <span className="opacity-50">© {new Date().getFullYear()} REPORTGUARD.</span> ALL SYSTEMS NOMINAL.
      </footer>
    </main>
  );
}
