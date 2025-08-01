
import { renderHook } from '@testing-library/react';
import useSkillVersion from '../useSkillVersion';
import { useAtomValue } from 'jotai';

jest.mock('jotai');

describe('useSkillVersion', () => {
  const mockVersionList = [
    { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' },
    { id: 27, short: 'V27', full: 'GITADORA HIGH-VOLTAGE' },
  ];

  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue(mockVersionList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct version for a given ID', () => {
    const { result } = renderHook(() => useSkillVersion({ versionId: 28 }));
    expect(result.current.version).toEqual({ id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' });
  });

  it('should return undefined if version is not found', () => {
    const { result } = renderHook(() => useSkillVersion({ versionId: 99 }));
    expect(result.current.version).toBeUndefined();
  });

  it('should return undefined if versionList is empty', () => {
    (useAtomValue as jest.Mock).mockReturnValue([]);
    const { result } = renderHook(() => useSkillVersion({ versionId: 28 }));
    expect(result.current.version).toBeUndefined();
  });
});
