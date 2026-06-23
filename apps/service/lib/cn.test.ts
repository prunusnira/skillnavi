import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
    it('여러 클래스를 병합한다', () => {
        expect(cn('a', 'b')).toBe('a b');
    });

    it('falsy 값을 무시한다', () => {
        expect(cn('a', false, undefined, null, 'b')).toBe('a b');
    });

    it('tailwind 충돌 클래스는 마지막 값으로 덮는다', () => {
        expect(cn('p-1', 'p-2')).toBe('p-2');
    });
});
