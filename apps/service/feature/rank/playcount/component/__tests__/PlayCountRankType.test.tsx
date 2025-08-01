
import { render, screen, fireEvent } from '@testing-library/react';
import PlayCountRankType from '../PlayCountRankType';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';

jest.mock('next/navigation');
jest.mock('jotai');
jest.mock('@/i18n/routing');

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick, isSelected }) => (
    <button onClick={onClick} className={isSelected ? 'selected' : ''}>
      {text}
    </button>
  ),
}));

jest.mock('@/common/versionSelector/VersionSelector', () => ({
  VersionSelector: ({ currentVersion, onChangeVersion }) => (
    <select value={currentVersion} onChange={onChangeVersion} data-testid="version-selector">
      <option value="28">Version 28</option>
      <option value="27">Version 27</option>
    </select>
  ),
}));

describe('PlayCountRankType', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useAtomValue as jest.Mock).mockReturnValue({ id: 28 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders version and type selectors', () => {
    render(<PlayCountRankType />);

    expect(screen.getByTestId('version-selector')).toBeInTheDocument();
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByText('DM')).toBeInTheDocument();
    expect(screen.getByText('ALL')).toBeInTheDocument();
  });

  it('calls router.push with correct version param on version change', () => {
    render(<PlayCountRankType />);
    const select = screen.getByTestId('version-selector');
    fireEvent.change(select, { target: { value: '27' } });
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?version=27&page=1');
  });

  it('calls router.push with correct type param on type button click', () => {
    render(<PlayCountRankType />);
    fireEvent.click(screen.getByText('DM'));
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?type=dm&page=1');

    fireEvent.click(screen.getByText('ALL'));
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?type=all&page=1');
  });
});
