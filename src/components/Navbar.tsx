import React from 'react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#E8DACB]/60 transition-all">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#4A1521] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          For Sabih <span className="text-[#C6A052] font-normal">❤️</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium tracking-wide text-[#5C4D44]">
          <button
            onClick={() => onNavigate('memories')}
            className="hover:text-[#4A1521] hover:underline underline-offset-4 decoration-[#C6A052] transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </button>
          <button
            onClick={() => onNavigate('letter')}
            className="hover:text-[#4A1521] hover:underline underline-offset-4 decoration-[#C6A052] transition-colors whitespace-nowrap shrink-0"
          >
            Love Letter
          </button>
          <button
            onClick={() => onNavigate('reasons')}
            className="hover:text-[#4A1521] hover:underline underline-offset-4 decoration-[#C6A052] transition-colors whitespace-nowrap shrink-0"
          >
            Little Things
          </button>
          <button
            onClick={() => onNavigate('surprise-envelopes')}
            className="hover:text-[#4A1521] hover:underline underline-offset-4 decoration-[#C6A052] transition-colors whitespace-nowrap shrink-0"
          >
            Secret Notes
          </button>
          <button
            onClick={() => onNavigate('cake')}
            className="hover:text-[#4A1521] hover:underline underline-offset-4 decoration-[#C6A052] transition-colors whitespace-nowrap shrink-0"
          >
            Birthday Cake
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('cake')}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#5A1E2B] rounded-full hover:bg-[#43141F] transition-colors shadow-sm whitespace-nowrap shrink-0 border border-[#C6A052]/40"
          >
            Make a Wish 🎂
          </button>
        </div>
      </div>
    </header>
  );
};
