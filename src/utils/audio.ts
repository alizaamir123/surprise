// Procedural Web Audio API sound generator for gentle ambient music box & celebration effects

let audioCtx: AudioContext | null = null;
let ambientTimer: number | null = null;
let isPlayingAmbient = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle music box chime note
export function playMusicBoxNote(freq: number, duration: number = 1.2, gainLevel: number = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm music box envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainLevel, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors if autoplay blocked
  }
}

// Gentle romantic ambient music box melody: peaceful arpeggio
const MELODY_FREQS = [
  523.25, // C5
  659.25, // E5
  783.99, // G5
  987.77, // B5
  1046.50, // C6
  880.00, // A5
  783.99, // G5
  659.25, // E5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  987.77, // B5
  783.99, // G5
  659.25, // E5
  523.25  // C5
];

export function startAmbientMelody(onStateChange?: (playing: boolean) => void) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isPlayingAmbient) return;
  isPlayingAmbient = true;
  onStateChange?.(true);

  let noteIdx = 0;
  function step() {
    if (!isPlayingAmbient) return;
    const freq = MELODY_FREQS[noteIdx % MELODY_FREQS.length];
    playMusicBoxNote(freq, 2.0, 0.04);
    // Add subtle lower harmony note every 4 notes
    if (noteIdx % 4 === 0) {
      playMusicBoxNote(freq / 2, 2.4, 0.025);
    }
    noteIdx++;
    ambientTimer = window.setTimeout(step, 800 + (noteIdx % 3 === 0 ? 300 : 0));
  }

  step();
}

export function stopAmbientMelody(onStateChange?: (playing: boolean) => void) {
  isPlayingAmbient = false;
  if (ambientTimer !== null) {
    clearTimeout(ambientTimer);
    ambientTimer = null;
  }
  onStateChange?.(false);
}

export function toggleAmbientMelody(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlayingAmbient) {
    stopAmbientMelody(onStateChange);
    return false;
  } else {
    startAmbientMelody(onStateChange);
    return true;
  }
}

// Celebration chime cascade when blowing candle
export function playCelebrationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playMusicBoxNote(freq, 1.8, 0.1);
    }, idx * 110);
  });
}

// Soft paper rustle / gentle click sound
export function playPaperRustle() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.value = 0.05;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Graceful fallback
  }
}
