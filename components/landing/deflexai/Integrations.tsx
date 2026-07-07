"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export function ContactSection() {
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
      if (!data.success) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-28 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="mono text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span>[ CONTACT ]</span>
            <div className="h-[1px] w-12 bg-gray-800" />
            <span>SIGNAL US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Have a question?
            <br />
            <span className="text-gray-500">We&apos;d love to hear from you.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Send us a message and we&apos;ll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* Left: Info cards */}
          <motion.div
            className="md:col-span-2 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 relative">
              <div className="mono text-[10px] text-gray-600 mb-3">[ EMAIL ]</div>
              <h3 className="font-medium text-white mb-1">Email us</h3>
              <p className="text-sm text-gray-500 mb-2">We typically reply within 24 hours.</p>
              <a href="mailto:kittyismystery@gmail.com" className="text-sm text-white opacity-60 hover:opacity-100 transition-opacity mono">
                kittyismystery@gmail.com
              </a>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 relative">
              <div className="mono text-[10px] text-gray-600 mb-3">[ CHAT ]</div>
              <h3 className="font-medium text-white mb-1">Live chat</h3>
              <p className="text-sm text-gray-500">Available Mon–Fri, 9 AM – 6 PM IST.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 relative">
              <div className="mono text-[10px] text-gray-600 mb-3">[ DOCS ]</div>
              <h3 className="font-medium text-white mb-1">FAQ & Docs</h3>
              <p className="text-sm text-gray-500">Browse common questions and guides.</p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
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
              className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 space-y-5 relative"
            >
              {status === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 text-sm font-medium mono flex items-center gap-2">
                  ✅ Your message has been sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 text-sm font-medium mono flex items-center gap-2">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-gray-400 mb-1.5 mono uppercase tracking-wider">
                    Your name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-all mono"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-gray-400 mb-1.5 mono uppercase tracking-wider">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-all mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-gray-400 mb-1.5 mono uppercase tracking-wider">Subject</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#050505] border border-[#1a1a1a] text-sm text-white focus:outline-none focus:border-gray-500 transition-all mono appearance-none"
                >
                  <option value="">Select a topic…</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="University Partnership">University Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-gray-400 mb-1.5 mono uppercase tracking-wider">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-[#050505] border border-[#1a1a1a] text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-all mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 retune-btn-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
