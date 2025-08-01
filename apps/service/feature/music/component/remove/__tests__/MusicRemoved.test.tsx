
import { render, screen } from '@testing-library/react';
import MusicRemoved from '../MusicRemoved';
import { useAtomValue } from 'jotai';

jest.mock('jotai');

describe('MusicRemoved', () => {
  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue([
      { id: 28, short: 'V28' },
      { id: 29, short: 'V29' },
    ]);
  });

  it('renders removed text when version is not 0', () => {
    render(<MusicRemoved version={29} />);
    expect(screen.getByText('removed in V29')).toBeInTheDocument();
  });

  it('does not render when version is 0', () => {
    const { container } = render(<MusicRemoved version={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders unknown when version is not found', () => {
    render(<MusicRemoved version={99} />);
    expect(screen.getByText('removed in unknown')).toBeInTheDocument();
  });
});
