
import { renderHook } from '@testing-library/react';
import MySkillRedirect from '../MySkillRedirect';
import { useRouter } from '@/i18n/routing';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

jest.mock('@/i18n/routing');
jest.mock('jotai');
jest.mock('next/navigation');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('MySkillRedirect', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useParams as jest.Mock).mockReturnValue({ type: 'gf' });
    (useEffect as jest.Mock).mockImplementation((cb) => cb()); // Immediately run useEffect callback
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to skill table when recent version is available', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 28 }); // Mock atomGameVersionLatest

    renderHook(() => MySkillRedirect({ userid: 123 }));

    expect(mockRouterPush).toHaveBeenCalledWith({
      id: 123,
      game: 'gf',
      pageType: 'target',
      version: 28,
      display: 'grid',
    });
  });

  it('should not redirect when recent version is not available', () => {
    (useAtomValue as jest.Mock).mockReturnValue(null); // Mock atomGameVersionLatest as null

    renderHook(() => MySkillRedirect({ userid: 123 }));

    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
