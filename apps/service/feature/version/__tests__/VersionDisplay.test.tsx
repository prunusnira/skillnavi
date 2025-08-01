
import { render, screen } from '@testing-library/react';
import VersionDisplay from '../VersionDisplay';
import { useAtomValue } from 'jotai';

jest.mock('jotai');

describe('VersionDisplay', () => {
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

  it('renders short version text', () => {
    render(<VersionDisplay version={28} type="short" />);
    expect(screen.getByText('V28')).toBeInTheDocument();
  });

  it('renders full version text', () => {
    render(<VersionDisplay version={27} type="full" />);
    expect(screen.getByText('GITADORA HIGH-VOLTAGE')).toBeInTheDocument();
  });

  it('renders nothing if version is not found', () => {
    const { container } = render(<VersionDisplay version={99} type="short" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies custom class name', () => {
    render(<VersionDisplay version={28} type="short" className="custom-class" />);
    expect(screen.getByText('V28')).toHaveClass('custom-class');
  });

  it('renders nothing if versionList is null', () => {
    (useAtomValue as jest.Mock).mockReturnValue(null);
    const { container } = render(<VersionDisplay version={28} type="short" />);
    expect(container).toBeEmptyDOMElement();
  });
});
