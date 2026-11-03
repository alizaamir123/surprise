import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { PhotoMemory } from '../types/birthday';
import { getNextMemoryId, getPreviousMemoryId } from '../utils/birthdayHelpers';

interface LightboxModalProps {
  activeMemory: PhotoMemory | null;
  memories: PhotoMemory[];
  onClose: () => void;
  onSelectMemory: (memory: PhotoMemory) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  activeMemory,
  memories,
  onClose,
  onSelectMemory
}) => {
  const handleNext = useCallback(() => {
    if (!activeMemory) return;
    const nextId = getNextMemoryId(activeMemory.id, memories);
    const nextMem = memories.find((m) => m.id === nextId);
    if (nextMem) onSelectMemory(nextMem);
  }, [activeMemory, memories, onSelectMemory]);

  const handlePrev = useCallback(() => {
    if (!activeMemory) return;
    const prevId = getPreviousMemoryId(activeMemory.id, memories);
    const prevMem = memories.find((m) => m.id === prevId);
    if (prevMem) onSelectMemory(prevMem);
  }, [activeMemory, memories, onSelectMemory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (activeMemory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMemory, handleNext, handlePrev, onClose]);

  if (!activeMemory) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={activeMemory.title}
      >
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close photo preview"
          className="absolute top-4 right-4 z-50 min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous photograph"
          className="absolute left-3 sm:left-6 z-50 min-h-[48px] min-w-[48px] rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/15"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next photograph"
          className="absolute right-3 sm:right-6 z-50 min-h-[48px] min-w-[48px] rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/15"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <motion.div
          key={activeMemory.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#FAF5ED] rounded-2xl overflow-hidden shadow-2xl border border-[#C6A052]/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photograph Container */}
          <div className="relative md:w-3/5 bg-[#1F1713] flex items-center justify-center p-2 sm:p-4 min-h-[280px] max-h-[50vh] md:max-h-[85vh] overflow-hidden">
            <img
              src={activeMemory.imageSrc}
              alt={activeMemory.title}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Emotional Caption & Note Sidebar */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#FAF5ED] to-[#F3EBDD]">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif-luxury tracking-widest uppercase text-[#8C6D58] mb-2">
                <span>{activeMemory.dateTag}</span>
                <span aria-hidden="true">·</span>
                <Heart className="w-3 h-3 fill-[#C6A052] text-[#C6A052]" />
              </div>

              <h2 className="font-display-luxury text-2xl sm:text-3xl text-[#3F131D] font-bold mb-3">
                {activeMemory.title}
              </h2>

              <p className="font-serif-luxury text-base sm:text-lg italic text-[#5A1E2B] mb-5 leading-relaxed">
                "{activeMemory.caption}"
              </p>

              <div className="p-4 rounded-xl bg-white/70 border border-[#E8DACB] text-xs sm:text-sm text-[#5C4D44] leading-relaxed">
                <span className="block font-semibold text-[#3F131D] mb-1 font-serif-luxury text-sm">
                  Personal Memory Note
                </span>
                {activeMemory.note}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DACB] flex items-center justify-between text-xs text-[#8C766C]">
              <span>Sabih & My Journey</span>
              <span className="font-serif-luxury tracking-wider text-[#5A1E2B] font-semibold">
                Photo {memories.findIndex((m) => m.id === activeMemory.id) + 1} of {memories.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
