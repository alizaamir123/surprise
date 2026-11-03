import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  HeartHandshake,
  Shield,
  Compass,
  SunMedium,
  Flame,
  MessageCircleHeart,
  Crown,
  Heart,
  Check
} from 'lucide-react';
import { REASONS_I_LOVE_YOU } from '../data/reasons';
import { formatOrdinal } from '../utils/birthdayHelpers';
import { playPaperRustle } from '../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  HeartHandshake,
  Shield,
  Compass,
  SunMedium,
  Flame,
  MessageCircleHeart,
  Crown
};

export const ReasonsSection: React.FC = () => {
  const [uncoveredIds, setUncoveredIds] = useState<number[]>([1]); // First reason is uncovered by default

  const toggleUncover = (id: number) => {
    playPaperRustle();
    setUncoveredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const uncoverAll = () => {
    playPaperRustle();
    setUncoveredIds(REASONS_I_LOVE_YOU.map((r) => r.id));
  };

  return (
    <section id="reasons" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#F5EBE1] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 text-[#C6A052] mb-3">
            <Heart className="w-4 h-4 fill-[#C6A052]" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
              Countless Reasons, Infinite Love
            </span>
            <Heart className="w-4 h-4 fill-[#C6A052]" />
          </div>

          <h2 className="font-display-luxury text-3xl sm:text-5xl font-bold text-[#3F131D] mb-4">
            Little Things I Love About You
          </h2>
          <p className="font-serif-luxury text-base sm:text-lg italic text-[#6B5A51] leading-relaxed">
            I could write a thousand volumes, but here are the sweet daily details that make you completely irreplaceable.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-xs font-serif-luxury text-[#8C766C]">
              {uncoveredIds.length} of {REASONS_I_LOVE_YOU.length} reasons uncovered
            </span>
            <button
              onClick={uncoverAll}
              className="text-xs font-serif-luxury underline underline-offset-4 text-[#5A1E2B] hover:text-[#3F131D] font-medium"
            >
              Uncover all reasons ✨
            </button>
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS_I_LOVE_YOU.map((reason, index) => {
            const Icon = iconMap[reason.iconName] || Heart;
            const isUncovered = uncoveredIds.includes(reason.id);

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onClick={() => toggleUncover(reason.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between min-h-[260px] ${
                  isUncovered
                    ? 'bg-[#FAF7F2] border-[#C6A052]/40 shadow-md shadow-[#C6A052]/10 scale-[1.01]'
                    : 'bg-[#FAF5ED]/70 border-[#E8DACB] hover:border-[#C6A052]/40 hover:bg-[#FAF7F2]'
                }`}
              >
                <div>
                  {/* Card top banner */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-serif-luxury tracking-widest text-[#8C6D58] font-semibold">
                      Reason #{reason.id}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isUncovered
                          ? 'bg-[#5A1E2B] text-[#DFBF7A]'
                          : 'bg-[#EFE4D6] text-[#78665C]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display-luxury text-xl font-bold text-[#3F131D] mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-[#8C766C] font-serif-luxury italic mb-4">
                    {reason.subtitle}
                  </p>

                  {/* Expandable heartfelt description */}
                  <div className="transition-all duration-300">
                    {isUncovered ? (
                      <p className="text-xs sm:text-sm text-[#4A3B34] font-serif-luxury leading-relaxed bg-[#F7F0E6] p-3 rounded-xl border border-[#EADBCC]">
                        "{reason.description}"
                      </p>
                    ) : (
                      <div className="py-6 flex flex-col items-center justify-center text-center">
                        <span className="text-xs text-[#9C8478] font-serif-luxury italic mb-1">
                          Tap to uncover this reason
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-[#C6A052] animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DACB] flex items-center justify-between text-[11px] text-[#9C8276]">
                  <span>{isUncovered ? 'Uncovered with love' : 'Hidden treasure'}</span>
                  {isUncovered && <Check className="w-3.5 h-3.5 text-[#5A1E2B]" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
