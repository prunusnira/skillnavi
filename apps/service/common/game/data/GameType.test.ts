import { describe, it, expect } from 'vitest';
import { isGameTypeAll } from './GameType';

describe('isGameTypeAll', () => {
    it('gf/dm/all 문자열은 true를 반환한다', () => {
        // Given
        const inputs = ['gf', 'dm', 'all'] as const;

        // When / Then
        for (const input of inputs) {
            expect(isGameTypeAll(input)).toBe(true);
        }
    });

    it('허용되지 않은 문자열은 false를 반환한다', () => {
        // Given
        const input = 'GF';

        // When
        const result = isGameTypeAll(input);

        // Then
        expect(result).toBe(false);
    });

    it('문자열이 아닌 값은 false를 반환한다', () => {
        // Given
        const inputs = [undefined, null, 1, {}, [], true];

        // When / Then
        for (const input of inputs) {
            expect(isGameTypeAll(input)).toBe(false);
        }
    });
});
