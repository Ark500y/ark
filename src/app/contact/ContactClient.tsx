'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMessageCircle, FiSend, FiCheck, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { SiBehance, SiDribbble } from 'react-icons/si';
import { contactInfo } from '@/data';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

const services = [
  'AI Web Design',
  'SaaS Product Design',
  'AI Automation',
  'Brand Identity',
  'Creative Frontend',
  'Growth Strategy',
  'Other',
];

const budgets = ['< $2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000–$25,000', '$25,000+'];

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/abdulrehman', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/abdulrehman', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/abdulrehman', label: 'Instagram' },
  { icon: SiBehance, href: 'https://behance.net/abdulrehman', label: 'Behance' },
  { icon: SiDribbble, href: 'https://dribbble.com/abdulrehman', label: 'Dribbble' },
];

export default function ContactClient() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [form, setForm] = useState<FormData>({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.service) errs.service = 'Please select a service';
    if (!form.message.trim()) errs.message = 'Tell me about your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero */}
      <div ref={ref} className="pt-40 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
        >
          Let&apos;s Talk
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,7vw,6rem)] font-display font-bold tracking-[-0.04em] leading-none text-white mb-6"
        >
          Start a project
          <br />
          <span className="text-gradient">worth building.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-white/40 max-w-lg"
        >
          Tell me about what you&apos;re building. I respond within 24 hours, every time.
        </motion.p>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-24 px-8 rounded-3xl border border-green-500/20 bg-green-500/5"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                    <FiCheck size={28} className="text-green-400" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-3">Message sent!</h2>
                  <p className="text-white/50 max-w-sm">
                    I&apos;ve received your message and will be in touch within 24 hours. Looking forward to hearing more!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Your Name" field="name" value={form.name} error={errors.name}
                      onChange={(v) => update('name', v)} placeholder="Abdul Rehman" />
                    <InputField label="Email Address" field="email" type="email" value={form.email}
                      error={errors.email} onChange={(v) => update('email', v)} placeholder="you@company.com" />
                  </div>

                  {/* Company */}
                  <InputField label="Company / Project (optional)" field="company" value={form.company}
                    onChange={(v) => update('company', v)} placeholder="Acme Corp" />

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-3">
                      Service Needed {errors.service && <span className="text-red-400 normal-case tracking-normal ml-2">{errors.service}</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update('service', s)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                            form.service === s
                              ? 'text-white border border-blue-500/50 bg-blue-500/10'
                              : 'text-white/40 border border-white/8 bg-white/[0.02] hover:border-white/15 hover:text-white/70'
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-3">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update('budget', b)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm transition-all duration-200',
                            form.budget === b
                              ? 'text-white border border-purple-500/50 bg-purple-500/10'
                              : 'text-white/40 border border-white/8 bg-white/[0.02] hover:border-white/15 hover:text-white/70'
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-2">
                      Tell Me About Your Project
                      {errors.message && <span className="text-red-400 normal-case tracking-normal ml-2">{errors.message}</span>}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      placeholder="What are you building? What's the goal? What does success look like?"
                      className={cn(
                        'form-input resize-none',
                        errors.message && 'border-red-500/50 focus:border-red-500/80'
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct contact */}
            <div className="p-7 rounded-2xl border border-white/8 bg-white/[0.02] space-y-5">
              <h3 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase">Direct Contact</h3>

              {[
                {
                  icon: FiMessageCircle,
                  label: 'WhatsApp',
                  value: contactInfo.phone,
                  href: `https://wa.me/${contactInfo.whatsapp}`,
                  color: 'text-green-400',
                },
                {
                  icon: FiMail,
                  label: 'Email',
                  value: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                  color: 'text-blue-400',
                },
                {
                  icon: FiPhone,
                  label: 'Phone',
                  value: contactInfo.phone,
                  href: `tel:${contactInfo.phone}`,
                  color: 'text-purple-400',
                },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'WhatsApp' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className={cn('w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center transition-all group-hover:border-white/15', color)}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30">{label}</div>
                    <div className="text-sm text-white/70 group-hover:text-white transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div className="p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
              <h3 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-4">What to expect</h3>
              <ul className="space-y-3">
                {[
                  'Response within 24 hours',
                  'Free 30-minute discovery call',
                  'No-pressure proposal within 48 hours',
                  'Fixed-price quotes, no surprises',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/50">
                    <span className="w-4 h-4 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1 h-1 bg-blue-400 rounded-full" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
              <h3 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-4">Follow My Work</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability indicator */}
            <div className="p-5 rounded-2xl border border-green-500/15 bg-green-500/5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Currently Available</div>
                  <div className="text-xs text-white/40">Next project start: August 2025</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label, field, type = 'text', value, error, onChange, placeholder,
}: {
  label: string;
  field: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={field} className="block text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-2">
        {label}
        {error && <span className="text-red-400 normal-case tracking-normal ml-2">{error}</span>}
      </label>
      <input
        id={field}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('form-input', error && 'border-red-500/50 focus:border-red-500/80')}
      />
    </div>
  );
}
