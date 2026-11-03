export interface PhotoMemory {
  id: string;
  imageSrc: string;
  title: string;
  caption: string;
  dateTag?: string;
  rotation: number; // slight polaroid rotation for organic handcrafted feel
  aspect: 'portrait' | 'square' | 'tall';
  note: string;
}

export interface LoveReason {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface SecretEnvelope {
  id: string;
  envelopeTitle: string;
  triggerContext: string;
  previewSnippet: string;
  letterContent: string[];
  signature: string;
  waxColor: string;
}
