import React, { useMemo } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles: React.FC = () => {
  // Deterministic particle positions to prevent SSR mismatch or flickering
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      top: (i * 3.7) % 100,
      left: (i * 17 + 7) % 100,
      size: (i % 3) + 2,
      duration: 8 + (i % 7),
      delay: (i % 5) * 1.5,
      opacity: 0.25 + ((i % 4) * 0.15)
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#C6A052] particle-drift"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            boxShadow: '0 0 8px 1px rgba(198, 160, 82, 0.4)'
          }}
        />
      ))}
    </div>
  );
};
