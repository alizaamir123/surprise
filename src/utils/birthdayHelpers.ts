import { PhotoMemory } from '../types/birthday';

/**
 * Returns reading time estimate in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 180): number {
  if (!text || !text.trim()) return 0;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Calculates next memory ID in carousel/lightbox sequence
 */
export function getNextMemoryId(currentId: string, memories: PhotoMemory[]): string {
  if (!memories.length) return '';
  const idx = memories.findIndex((m) => m.id === currentId);
  if (idx === -1) return memories[0].id;
  const nextIdx = (idx + 1) % memories.length;
  return memories[nextIdx].id;
}

/**
 * Calculates previous memory ID in carousel/lightbox sequence
 */
export function getPreviousMemoryId(currentId: string, memories: PhotoMemory[]): string {
  if (!memories.length) return '';
  const idx = memories.findIndex((m) => m.id === currentId);
  if (idx === -1) return memories[0].id;
  const prevIdx = (idx - 1 + memories.length) % memories.length;
  return memories[prevIdx].id;
}

/**
 * Validates and cleans a birthday wish input
 */
export function validateAndCleanWish(wish: string): { isValid: boolean; sanitized: string; errorMessage?: string } {
  const trimmed = wish.trim();
  if (trimmed.length === 0) {
    return { isValid: false, sanitized: '', errorMessage: 'Please enter a wish from the heart.' };
  }
  if (trimmed.length > 500) {
    return { isValid: false, sanitized: trimmed.slice(0, 500), errorMessage: 'Wish is too long (max 500 characters).' };
  }
  return { isValid: true, sanitized: trimmed };
}

/**
 * Formats ordinal number (1st, 2nd, 3rd, 4th...)
 */
export function formatOrdinal(n: number): string {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const suffixes: Record<string, string> = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th'
  };
  return `${n}${suffixes[pr.select(n)] || 'th'}`;
}

/**
 * Summarizes memory collection tags
 */
export function extractUniqueCategories(memories: PhotoMemory[]): string[] {
  const set = new Set<string>();
  memories.forEach((m) => {
    if (m.dateTag) set.add(m.dateTag);
  });
  return Array.from(set);
}
