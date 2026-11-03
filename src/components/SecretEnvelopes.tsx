import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, X, Heart, CheckCircle2 } from 'lucide-react';
import { SECRET_ENVELOPES } from '../data/envelopes';
import { SecretEnvelope } from '../types/birthday';
import { playPaperRustle } from '../utils/audio';

export const SecretEnvelopes: React.FC = () => {
  const [activeEnvelope, setActiveEnvelope] = useState<SecretEnvelope | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleOpen = (envelope: SecretEnvelope) => {
    playPaperRustle();
    setActiveEnvelope(envelope);
    if (!openedIds.includes(envelope.id)) {
      setOpenedIds((prev) => [...prev, envelope.id]);
    }
  };

  const handleClose = () => {
    playPaperRustle();
    setActiveEnvelope(null);
  };

  return (
    <section id="surprise-envelopes" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-2 text-[#C6A052] mb-3">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
              A Surprise Interactive Keepsake
            </span>
            <Mail className="w-4 h-4" />
          </div>

          <h2 className="font-display-luxury text-3xl sm:text-5xl font-bold text-[#3F131D] mb-4">
            "Open When..." Secret Letters
          </h2>
          <p className="font-serif-luxury text-base sm:text-lg italic text-[#5C4D44] leading-relaxed">
            Little pieces of my heart sealed for specific moments. Tap any letter to break the wax seal and read what I wrote for you.
          </p>

          <div className="mt-4 text-xs font-serif-luxury text-[#8C766C]">
            {openedIds.length} of {SECRET_ENVELOPES.length} envelopes opened
          </div>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECRET_ENVELOPES.map((env, index) => {
            const isOpened = openedIds.includes(env.id);

            return (
              <motion.div
                key={env.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleOpen(env)}
                className="group cursor-pointer relative bg-[#FAF5ED] rounded-2xl p-6 border-2 border-[#E2D4C3] shadow-md hover:shadow-xl hover:border-[#C6A052] transition-all flex flex-col justify-between min-h-[280px]"
              >
                {/* Envelope Flap illusion */}
                <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#EFE5D8] to-transparent rounded-t-2xl pointer-events-none" />

                <div>
                  {/* Wax Seal Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-serif-luxury tracking-widest text-[#8C6D58] uppercase">
                      Letter #{index + 1}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md border-2 border-[#DFBF7A]/60 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: env.waxColor }}
                    >
                      <Heart className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>

                  <h3 className="font-display-luxury text-xl font-bold text-[#3F131D] mb-2 leading-snug">
                    {env.envelopeTitle}
                  </h3>

                  <p className="text-xs text-[#7A6A60] font-serif-luxury italic mb-4 leading-relaxed">
                    {env.triggerContext}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DACB] flex items-center justify-between text-xs text-[#C6A052] font-medium">
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    <span>Break Wax Seal</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  {isOpened && (
                    <span className="flex items-center gap-1 text-[11px] text-[#5A1E2B]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Opened Letter Modal */}
        <AnimatePresence>
          {activeEnvelope && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={activeEnvelope.envelopeTitle}
            >
              <div className="absolute inset-0" onClick={handleClose} />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 max-w-2xl w-full parchment-card rounded-2xl p-6 sm:p-10 border-2 border-[#C6A052]/50 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  aria-label="Close letter"
                  className="absolute top-4 right-4 min-h-[44px] min-w-[44px] rounded-full bg-[#FAF5ED] hover:bg-white text-[#5A1E2B] flex items-center justify-center border border-[#E8DACB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Letter Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8DACB] pr-12">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm shrink-0"
                    style={{ backgroundColor: activeEnvelope.waxColor }}
                  >
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display-luxury text-xl sm:text-2xl font-bold text-[#3F131D] leading-tight break-words">
                      {activeEnvelope.envelopeTitle}
                    </h3>
                    <p className="text-xs text-[#8C766C] font-serif-luxury italic mt-0.5">
                      {activeEnvelope.triggerContext}
                    </p>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="space-y-4 text-[#3A2E28] font-serif-luxury text-base sm:text-lg leading-relaxed sm:leading-loose">
                  {activeEnvelope.letterContent.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Signature */}
                <div className="mt-8 pt-6 border-t border-[#E8DACB] text-right">
                  <p className="font-script-romantic text-2xl sm:text-3xl text-[#5A1E2B]">
                    {activeEnvelope.signature}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
