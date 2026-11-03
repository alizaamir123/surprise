import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReadingTime,
  getNextMemoryId,
  getPreviousMemoryId,
  validateAndCleanWish,
  formatOrdinal,
  extractUniqueCategories
} from './birthdayHelpers';
import { PhotoMemory } from '../types/birthday';

const mockMemories: PhotoMemory[] = [
  {
    id: 'm1',
    imageSrc: '/test1.jpg',
    title: 'First Memory',
    caption: 'Caption 1',
    dateTag: 'Car Rides',
    rotation: 0,
    aspect: 'portrait',
    note: 'Note 1'
  },
  {
    id: 'm2',
    imageSrc: '/test2.jpg',
    title: 'Second Memory',
    caption: 'Caption 2',
    dateTag: 'Celebration Evening',
    rotation: 1,
    aspect: 'tall',
    note: 'Note 2'
  },
  {
    id: 'm3',
    imageSrc: '/test3.jpg',
    title: 'Third Memory',
    caption: 'Caption 3',
    dateTag: 'Car Rides',
    rotation: -1,
    aspect: 'square',
    note: 'Note 3'
  }
];

test('calculateReadingTime calculates reading time correctly', () => {
  assert.equal(calculateReadingTime(''), 0);
  assert.equal(calculateReadingTime('   '), 0);
  assert.equal(calculateReadingTime('Happy birthday to my favorite person!'), 1);
  const longText = new Array(360).fill('love').join(' ');
  assert.equal(calculateReadingTime(longText), 2);
});

test('getNextMemoryId cycles smoothly forward', () => {
  assert.equal(getNextMemoryId('m1', mockMemories), 'm2');
  assert.equal(getNextMemoryId('m2', mockMemories), 'm3');
  assert.equal(getNextMemoryId('m3', mockMemories), 'm1'); // loops back
  assert.equal(getNextMemoryId('unknown', mockMemories), 'm1');
});

test('getPreviousMemoryId cycles smoothly backward', () => {
  assert.equal(getPreviousMemoryId('m3', mockMemories), 'm2');
  assert.equal(getPreviousMemoryId('m2', mockMemories), 'm1');
  assert.equal(getPreviousMemoryId('m1', mockMemories), 'm3'); // loops back
  assert.equal(getPreviousMemoryId('unknown', mockMemories), 'm1');
});

test('validateAndCleanWish enforces input validation', () => {
  const emptyRes = validateAndCleanWish('   ');
  assert.equal(emptyRes.isValid, false);

  const validRes = validateAndCleanWish('  May all your dreams come true!  ');
  assert.equal(validRes.isValid, true);
  assert.equal(validRes.sanitized, 'May all your dreams come true!');

  const overlyLong = 'a'.repeat(510);
  const longRes = validateAndCleanWish(overlyLong);
  assert.equal(longRes.isValid, false);
});

test('formatOrdinal formats ordinals accurately', () => {
  assert.equal(formatOrdinal(1), '1st');
  assert.equal(formatOrdinal(2), '2nd');
  assert.equal(formatOrdinal(3), '3rd');
  assert.equal(formatOrdinal(4), '4th');
  assert.equal(formatOrdinal(21), '21st');
});

test('extractUniqueCategories deduplicates category tags', () => {
  const cats = extractUniqueCategories(mockMemories);
  assert.deepEqual(cats, ['Car Rides', 'Celebration Evening']);
});
