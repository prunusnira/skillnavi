
import { getTowerType } from '../getTowerType';

describe('getTowerType', () => {
  it('should return GuitarFreaks for gf type', () => {
    expect(getTowerType('gf')).toBe('GuitarFreaks');
  });

  it('should return DrumMania for dm type', () => {
    expect(getTowerType('dm')).toBe('DrumMania');
  });

  it('should return Special for sp type', () => {
    expect(getTowerType('sp')).toBe('Special');
  });

  it('should return empty string for unknown type', () => {
    expect(getTowerType('unknown')).toBe('');
  });
});
