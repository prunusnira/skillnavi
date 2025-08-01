
import { render, screen, fireEvent } from '@testing-library/react';
import { VersionSelector } from '../VersionSelector';
import { useAtomValue } from 'jotai';

jest.mock('jotai');

jest.mock('@skillnavi/ui', () => ({
  Select: ({ options, onChange, value }) => (
    <select data-testid="select-element" onChange={onChange} value={value}>
      {options.map(option => <option key={option.value} value={option.value}>{option.display}</option>)}
    </select>
  ),
}));

describe('VersionSelector', () => {
  const mockVersionList = [
    { id: 0, short: 'ALL', full: 'All Versions' },
    { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' },
    { id: 27, short: 'V27', full: 'GITADORA HIGH-VOLTAGE' },
    { id: 26, short: 'V26', full: 'GITADORA GALAXY WAVE' },
  ];

  const mockOnChangeVersion = jest.fn();

  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue(mockVersionList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all versions by default', () => {
    render(<VersionSelector onChangeVersion={mockOnChangeVersion} currentVersion={0} />);
    expect(screen.getByText('All Versions')).toBeInTheDocument();
    expect(screen.getByText('GITADORA FUZZ-UP')).toBeInTheDocument();
    expect(screen.getByText('GITADORA HIGH-VOLTAGE')).toBeInTheDocument();
    expect(screen.getByText('GITADORA GALAXY WAVE')).toBeInTheDocument();
  });

  it('filters out ALL option when withoutAll is true', () => {
    render(<VersionSelector onChangeVersion={mockOnChangeVersion} currentVersion={28} withoutAll />);
    expect(screen.queryByText('All Versions')).not.toBeInTheDocument();
    expect(screen.getByText('GITADORA FUZZ-UP')).toBeInTheDocument();
  });

  it('filters versions from versionFrom', () => {
    render(<VersionSelector onChangeVersion={mockOnChangeVersion} currentVersion={28} versionFrom={27} />);
    expect(screen.queryByText('All Versions')).toBeInTheDocument(); // withoutAll is false
    expect(screen.getByText('GITADORA FUZZ-UP')).toBeInTheDocument();
    expect(screen.getByText('GITADORA HIGH-VOLTAGE')).toBeInTheDocument();
    expect(screen.queryByText('GITADORA GALAXY WAVE')).not.toBeInTheDocument();
  });

  it('calls onChangeVersion on select change', () => {
    render(<VersionSelector onChangeVersion={mockOnChangeVersion} currentVersion={28} />);
    const select = screen.getByTestId('select-element');
    fireEvent.change(select, { target: { value: '27' } });
    expect(mockOnChangeVersion).toHaveBeenCalledTimes(1);
  });

  it('sets the correct selected value', () => {
    render(<VersionSelector onChangeVersion={mockOnChangeVersion} currentVersion={27} />);
    const select = screen.getByTestId('select-element') as HTMLSelectElement;
    expect(select.value).toBe('27');
  });
});
