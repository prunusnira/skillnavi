
import { getSkillCN } from '../getSkillCN';

describe('getSkillCN', () => {
  it('should return correct class name for skill values', () => {
    expect(getSkillCN(500)).toBe('skill-0');
    expect(getSkillCN(1000)).toBe('skill-1000');
    expect(getSkillCN(1499)).toBe('skill-1000');
    expect(getSkillCN(1500)).toBe('skill-1500');
    expect(getSkillCN(9999)).toBe('skill-9500');
    expect(getSkillCN(10000)).toBeUndefined(); // No class for 10000 or higher
  });
});
