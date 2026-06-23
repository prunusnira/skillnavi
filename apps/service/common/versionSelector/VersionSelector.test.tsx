import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider as JotaiProvider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';
import { VersionSelector } from './VersionSelector';

// GameVersion 타입에 맞춘 fixture
const versionList = [
    {
        id: 0,
        full: 'ALL',
        short: 'ALL',
    },
    {
        id: 1,
        full: 'Gitadora(1)',
        short: 'GD',
    },
    {
        id: 2,
        full: 'Tri-Boost(2)',
        short: 'TB',
    },
    {
        id: 3,
        full: 'Exchain(3)',
        short: 'EX',
    },
] as const;

const Hydrator = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([[atomGameVersionList, [...versionList]]]);
    return <>{children}</>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <JotaiProvider>
        <Hydrator>{children}</Hydrator>
    </JotaiProvider>
);

describe('VersionSelector', () => {
    it('전체 버전 목록을 표시한다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <Wrapper>
                <VersionSelector
                    onChangeVersion={onChange}
                    currentVersion={1}
                />
            </Wrapper>,
        );

        // Then
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(screen.getByText('Gitadora(1)')).toBeInTheDocument();
        expect(screen.getByText('ALL')).toBeInTheDocument();
    });

    it('withoutAll이 true면 ALL(id=0) 항목을 제외한다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <Wrapper>
                <VersionSelector
                    onChangeVersion={onChange}
                    currentVersion={1}
                    withoutAll
                />
            </Wrapper>,
        );

        // Then
        expect(screen.queryByText('ALL')).not.toBeInTheDocument();
        expect(screen.getByText('Gitadora(1)')).toBeInTheDocument();
    });

    it('versionFrom이 지정되면 해당 id 이상만 표시한다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <Wrapper>
                <VersionSelector
                    onChangeVersion={onChange}
                    currentVersion={2}
                    versionFrom={2}
                />
            </Wrapper>,
        );

        // Then
        expect(screen.queryByText('ALL')).not.toBeInTheDocument();
        expect(screen.queryByText('Gitadora(1)')).not.toBeInTheDocument();
        expect(screen.getByText('Tri-Boost(2)')).toBeInTheDocument();
    });

    it('disabledUntil 이하 버전은 disabled 처리된다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <Wrapper>
                <VersionSelector
                    onChangeVersion={onChange}
                    currentVersion={3}
                    disabledUntil={2}
                />
            </Wrapper>,
        );

        // Then
        const options = screen.getAllByRole('option');
        const disabledValues = options
            .filter((o) => (o as HTMLOptionElement).disabled)
            .map((o) => (o as HTMLOptionElement).value);
        expect(disabledValues).toContain('0');
        expect(disabledValues).toContain('1');
        expect(disabledValues).toContain('2');
        expect(disabledValues).not.toContain('3');
    });

    it('select 변경 시 onChangeVersion이 호출된다', () => {
        // Given
        const onChange = vi.fn<(e: React.ChangeEvent<HTMLSelectElement>) => void>();

        render(
            <Wrapper>
                <VersionSelector
                    onChangeVersion={onChange}
                    currentVersion={1}
                />
            </Wrapper>,
        );

        // When
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: '2' },
        });

        // Then
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
