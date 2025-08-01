
import { render, screen } from '@testing-library/react';
import SkillItemVersion from '../SkillItemVersion';
import useSkillVersion from '../useSkillVersion';

jest.mock('../useSkillVersion');

describe('SkillItemVersion', () => {
  it('renders short version text', () => {
    (useSkillVersion as jest.Mock).mockReturnValue({ version: { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' } });
    render(<SkillItemVersion versionId={28} type="short" />);
    expect(screen.getByText('V28')).toBeInTheDocument();
  });

  it('renders full version text', () => {
    (useSkillVersion as jest.Mock).mockReturnValue({ version: { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' } });
    render(<SkillItemVersion versionId={28} type="full" />);
    expect(screen.getByText('GITADORA FUZZ-UP')).toBeInTheDocument();
  });

  it('renders nothing if version is not found', () => {
    (useSkillVersion as jest.Mock).mockReturnValue({ version: undefined });
    const { container } = render(<SkillItemVersion versionId={99} type="short" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies custom class name', () => {
    (useSkillVersion as jest.Mock).mockReturnValue({ version: { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' } });
    render(<SkillItemVersion versionId={28} type="short" className="custom-class" />);
    expect(screen.getByText('V28')).toHaveClass('custom-class');
  });
});
