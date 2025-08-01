import { renderHook, waitFor } from '@testing-library/react';
import Version from '../Version';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

jest.mock('@tanstack/react-query');
jest.mock('jotai');
jest.mock('@/feature/env/api/getGameVersions');

describe('Version', () => {
    const mockSetVersion = jest.fn();
    const mockSetLatest = jest.fn();
    const mockRefetch = jest.fn();

    beforeEach(() => {
        (useAtom as jest.Mock)
            .mockReturnValueOnce([
                null,
                mockSetVersion,
            ]) // atomGameVersionList
            .mockReturnValueOnce([
                null,
                mockSetLatest,
            ]); // atomGameVersionLatest

        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            refetch: mockRefetch,
            enabled: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call refetch on initial render if versions are not set', () => {
        renderHook(() => Version());
        expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    it('should set versions and latest version when data is fetched', async () => {
        const mockGameVersions = [
            { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' },
            { id: 27, short: 'V27', full: 'GITADORA HIGH-VOLTAGE' },
        ];

        (useQuery as jest.Mock).mockReturnValue({
            data: mockGameVersions,
            refetch: mockRefetch,
            enabled: false,
        });

        // Re-render the hook to trigger the useEffect with new data
        const { rerender } = renderHook(() => Version());
        rerender();

        await waitFor(() => {
            expect(mockSetVersion).toHaveBeenCalledWith(mockGameVersions);
            expect(mockSetLatest).toHaveBeenCalledWith(mockGameVersions[0]); // Latest version is 28
        });
    });

    it('should not refetch if versions are already set', () => {
        (useAtom as jest.Mock)
            .mockReturnValueOnce([
                [{ id: 1 }],
                mockSetVersion,
            ]) // atomGameVersionList already set
            .mockReturnValueOnce([
                {},
                mockSetLatest,
            ]); // atomGameVersionLatest already set

        renderHook(() => Version());
        expect(mockRefetch).not.toHaveBeenCalled();
    });
});
