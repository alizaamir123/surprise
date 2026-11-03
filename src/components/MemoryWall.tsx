import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2, Camera, LayoutGrid, Heart } from 'lucide-react';
import { PhotoMemory } from '../types/birthday';
import { MEMORIES } from '../data/memories';
import { LightboxModal } from './LightboxModal';

export const MemoryWall: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<PhotoMemory | null>(null);
  const [viewMode, setViewMode] = useState<'polaroid' | 'editorial'>('polaroid');

  return (
    <section id="memories" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-[#C6A052] mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] uppercase text-[#7A6054]">
              A Visual Journey Of Us
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-display-luxury text-3xl sm:text-5xl font-bold text-[#3F131D] mb-4">
            Our Cherished Memories
          </h2>
          <p className="font-serif-luxury text-base sm:text-xl italic text-[#5C4D44] leading-relaxed">
            Every snapshot captures a moment where I looked at you and thought, "How lucky am I to call this man mine?"
          </p>

          {/* Interactive View Mode Switcher */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#F1E8DC] rounded-full border border-[#E2D4C3]">
            <button
              onClick={() => setViewMode('polaroid')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'polaroid'
                  ? 'bg-[#5A1E2B] text-white shadow-sm'
                  : 'text-[#6B5A51] hover:text-[#3F131D]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Polaroid Wall</span>
            </button>
            <button
              onClick={() => setViewMode('editorial')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'editorial'
                  ? 'bg-[#5A1E2B] text-white shadow-sm'
                  : 'text-[#6B5A51] hover:text-[#3F131D]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Editorial Gallery</span>
            </button>
          </div>
        </div>

        {/* Polaroid Wall View */}
        {viewMode === 'polaroid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
            {MEMORIES.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                style={{ transform: `rotate(${memory.rotation}deg)` }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedMemory(memory)}
              >
                {/* Washi tape accent on top of polaroid */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#EADCCB]/80 border border-[#D5C1AA] shadow-xs rotate-[-2deg] z-20 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="polaroid-frame p-3.5 pb-5 rounded-sm bg-white transition-all">
                  {/* Photo frame */}
                  <div className="relative aspect-[4/5] bg-[#EFE9DF] overflow-hidden rounded-xs mb-3 shadow-inner">
                    <img
                      src={memory.imageSrc}
                      alt={memory.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#3F131D]/0 group-hover:bg-[#3F131D]/15 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 text-[#3F131D] shadow-sm">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Romantic Caption */}
                  <div className="px-1 text-center">
                    <p className="font-script-romantic text-xl text-[#3F131D] mb-1 line-clamp-1">
                      {memory.title}
                    </p>
                    <p className="text-[11px] text-[#78665C] line-clamp-2 italic font-serif-luxury leading-tight">
                      "{memory.caption}"
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-[#C6A052] font-semibold">
                      {memory.dateTag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Editorial Masonry View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMORIES.map((memory, index) => (
              <motion.article
                key={memory.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group cursor-pointer bg-[#FAF5ED] rounded-2xl overflow-hidden border border-[#E8DACB] shadow-sm hover:shadow-lg transition-all"
                onClick={() => setSelectedMemory(memory)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#241A14]">
                  <img
                    src={memory.imageSrc}
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-[#E8D5C4] mb-1 font-serif-luxury tracking-widest uppercase">
                      <span>{memory.dateTag}</span>
                      <span>·</span>
                      <Heart className="w-3 h-3 fill-[#C6A052] text-[#C6A052]" />
                    </div>
                    <h3 className="font-display-luxury text-xl font-bold leading-tight mb-1 text-white">
                      {memory.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-serif-luxury italic text-sm text-[#5A1E2B] mb-2 leading-relaxed">
                    "{memory.caption}"
                  </p>
                  <p className="text-xs text-[#7A6A60] line-clamp-2 leading-relaxed">
                    {memory.note}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#C6A052]">
                    <span>View photo details</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <LightboxModal
          activeMemory={selectedMemory}
          memories={MEMORIES}
          onClose={() => setSelectedMemory(null)}
          onSelectMemory={setSelectedMemory}
        />
      </div>
    </section>
  );
};
