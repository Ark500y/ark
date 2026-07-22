'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/data';

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} id="process" className="relative section-padding overflow-hidden bg-[#050508]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
          >
            How I Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-[-0.04em] text-white leading-tight"
          >
            A process built
            <br />
            <span className="text-gradient">for results</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Step list */}
          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <motion.button
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-400 group ${
                  activeStep === i
                    ? 'border-blue-500/30 bg-blue-500/5'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-sm font-medium transition-colors shrink-0 mt-1 ${
                      activeStep === i ? 'text-blue-400' : 'text-white/20'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-display font-semibold text-lg tracking-[-0.02em] transition-colors ${
                        activeStep === i ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <motion.div
                      animate={{ height: activeStep === i ? 'auto' : 0, opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/40 text-sm leading-relaxed mt-2">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                  {step.duration && (
                    <span className="text-xs font-mono text-white/25 shrink-0">{step.duration}</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32"
          >
            <div className="p-8 rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="text-5xl font-display font-bold text-gradient mb-4 tracking-[-0.04em]">
                {processSteps[activeStep].number}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                {processSteps[activeStep].title}
              </h3>
              <p className="text-white/50 leading-relaxed mb-8">
                {processSteps[activeStep].description}
              </p>

              {processSteps[activeStep].deliverables && (
                <div>
                  <p className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-4">
                    Deliverables
                  </p>
                  <ul className="space-y-3">
                    {processSteps[activeStep].deliverables!.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        </span>
                        <span className="text-sm text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {processSteps[activeStep].duration && (
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                  <span className="text-xs text-white/25">Typical duration:</span>
                  <span className="text-xs font-mono text-blue-400/70">
                    {processSteps[activeStep].duration}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
