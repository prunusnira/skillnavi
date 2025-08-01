import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateSnapshot } from '../useCreateSnapshot';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

jest.mock('@tanstack/react-query');
jest.mock('@/feature/snapshot/api/createSnapshot');
jest.mock('dayjs', () => {
    const originalDayjs = jest.requireActual('dayjs');
    return jest.fn((...args) => originalDayjs(...args));
});

describe('useCreateSnapshot', () => {
    const mockMutateSnapshot = jest.fn();
    const mockAlert = jest.fn();

    beforeEach(() => {
        (useMutation as jest.Mock).mockReturnValue({
            mutate: mockMutateSnapshot,
        });
        global.alert = mockAlert;
        (dayjs as jest.Mock).mockReturnValue({
            format: jest.fn(() => '20231026'),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call createSnapshot with correctly formatted data', () => {
        const { result } = renderHook(() => useCreateSnapshot());

        const hotData = [
            {
                patterncode: 1,
                rate: 9500,
                skill: 70000,
                mid: 100,
                maxrank: 'S',
                level: 700,
                mname: 'Hot Song',
                playver: 28,
                fc: true,
            },
        ];
        const otherData = [
            {
                patterncode: 2,
                rate: 8000,
                skill: 60000,
                mid: 200,
                maxrank: 'A',
                level: 600,
                mname: 'Other Song',
                playver: 28,
                fc: false,
            },
        ];

        act(() => {
            result.current.makeSnapshot({
                uid: 1,
                uname: 'Test User',
                type: 'gf',
                hot: hotData as any,
                other: otherData as any,
            });
        });

        expect(mockMutateSnapshot).toHaveBeenCalledWith({
            date: '20231026',
            uid: 1,
            uname: 'Test User',
            type: 'gf',
            hot: [
                {
                    ptcode: 1,
                    rate: 9500,
                    meter: '',
                    skill: 70000,
                    mid: 100,
                    rank: 'S',
                    lv: 700,
                    mname: 'Hot Song',
                    version: 28,
                    fc: 'Y',
                },
            ],
            oth: [
                {
                    ptcode: 2,
                    rate: 8000,
                    meter: '',
                    skill: 60000,
                    mid: 200,
                    rank: 'A',
                    lv: 600,
                    mname: 'Other Song',
                    version: 28,
                    fc: 'N',
                },
            ],
        });
    });

    it('should show success alert on successful mutation', async () => {
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutate: (variables) => {
                options.onSuccess();
            },
        }));

        const { result } = renderHook(() => useCreateSnapshot());
        act(() => {
            result.current.makeSnapshot({
                uid: 1,
                uname: 'Test User',
                type: 'gf',
                hot: [],
                other: [],
            });
        });

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith(
                'Snapshot successfully created!',
            );
        });
    });

    it('should show error alert on failed mutation', async () => {
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutate: (variables) => {
                options.onError();
            },
        }));

        const { result } = renderHook(() => useCreateSnapshot());
        act(() => {
            result.current.makeSnapshot({
                uid: 1,
                uname: 'Test User',
                type: 'gf',
                hot: [],
                other: [],
            });
        });

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Snapshot not created!');
        });
    });
});
