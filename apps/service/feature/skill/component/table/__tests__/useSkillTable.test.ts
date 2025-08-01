import { renderHook, waitFor } from '@testing-library/react';
import useSkillTable from '../useSkillTable';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSkillTable } from '@/feature/skill/api/getSkillTable';
import { getProfile } from '@/feature/profile/api/getProfile';
import { getProfileSkill } from '@/feature/profile/api/getProfileSkill';

jest.mock('next/navigation');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/skill/api/getSkillTable');
jest.mock('@/feature/profile/api/getProfile');
jest.mock('@/feature/profile/api/getProfileSkill');

describe('useSkillTable', () => {
    const mockSearchParams = new URLSearchParams({
        page: '1',
        game: 'gf',
        version: '28',
        display: 'grid',
        pageType: 'target',
    });

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: '123' });
        (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

        (useQuery as jest.Mock).mockImplementation((options) => {
            if (options.queryKey[0] === 'skill') {
                return {
                    data: { data: [], pages: 1 },
                    isLoading: false,
                    refetch: jest.fn(),
                };
            }
            if (options.queryKey[0] === 'profile') {
                return {
                    data: [{ id: '123', name: 'Test User' }],
                    isLoading: false,
                };
            }
            if (options.queryKey[0] === 'profileSkill') {
                return {
                    data: [{ version: 28, gskill: 100000, dskill: 50000 }],
                    isLoading: false,
                };
            }
            return { data: undefined, isLoading: false };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return initial state and fetch data', async () => {
        const { result } = renderHook(() => useSkillTable());

        expect(result.current.page).toBe(1);
        expect(result.current.game).toBe('gf');
        expect(result.current.version).toBe(28);
        expect(result.current.display).toBe('grid');
        expect(result.current.pageType).toBe('target');
        expect(result.current.isLoading).toBe(false);

        await waitFor(() => {
            expect(getSkillTable).toHaveBeenCalledWith({
                id: '123',
                page: 1,
                game: 'gf',
                version: 28,
                order: undefined,
                pageType: 'target',
            });
            expect(getProfile).toHaveBeenCalledWith([123]);
            expect(getProfileSkill).toHaveBeenCalledWith([123]);
        });
    });

    it('should update skillSum correctly', () => {
        (useQuery as jest.Mock).mockImplementation((options) => {
            if (options.queryKey[0] === 'skill') {
                return {
                    data: {
                        data: [
                            {
                                data: [
                                    { skill: 100 },
                                    { skill: 200 },
                                ],
                            },
                            { data: [{ skill: 300 }] },
                        ],
                        pages: 1,
                    },
                    isLoading: false,
                    refetch: jest.fn(),
                };
            }
            if (options.queryKey[0] === 'profile') {
                return {
                    data: [{ id: '123', name: 'Test User' }],
                    isLoading: false,
                };
            }
            if (options.queryKey[0] === 'profileSkill') {
                return {
                    data: [{ version: 28, gskill: 100000, dskill: 50000 }],
                    isLoading: false,
                };
            }
            return { data: undefined, isLoading: false };
        });

        const { result } = renderHook(() => useSkillTable());
        expect(result.current.skillSum).toEqual([
            300,
            300,
        ]);
    });

    it('should update userSkill correctly', () => {
        const { result } = renderHook(() => useSkillTable());
        expect(result.current.userSkill).toEqual({
            all: 150000,
            gf: 100000,
            dm: 50000,
        });
    });

    it('should refetch data on searchParams change', () => {
        const mockRefetch = jest.fn();
        (useQuery as jest.Mock).mockReturnValue({
            data: { data: [], pages: 1 },
            isLoading: false,
            refetch: mockRefetch,
        });

        const { rerender } = renderHook(() => useSkillTable());

        // Simulate searchParams change
        (useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams('page=2'),
        );
        rerender();

        expect(mockRefetch).toHaveBeenCalled();
    });
});
