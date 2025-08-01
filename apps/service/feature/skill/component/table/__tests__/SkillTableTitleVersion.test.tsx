
import { render, screen } from '@testing-library/react';
import SkillTableTitleVersion from '../SkillTableTitleVersion';
import { useAtomValue } from 'jotai';

jest.mock('jotai');

describe('SkillTableTitleVersion', () => {
  const mockVersionList = [
    { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' },
    { id: 27, short: 'V27', full: 'GITADORA HIGH-VOLTAGE' },
  ];
  const mockLatestVersion = { id: 28, short: 'V28', full: 'GITADORA FUZZ-UP' };

  beforeEach(() => {
    (useAtomValue as jest.Mock)
      .mockReturnValueOnce(mockVersionList) // atomGameVersionList
      .mockReturnValueOnce(mockLatestVersion); // atomGameVersionLatest
  });

  it('renders full version name for a given versionId', () => {
    render(<SkillTableTitleVersion versionId={27} />);
    expect(screen.getByText('GITADORA HIGH-VOLTAGE')).toBeInTheDocument();
  });

  it('renders latest version name when versionId is 0', () => {
    render(<SkillTableTitleVersion versionId={0} />);
    expect(screen.getByText('GITADORA FUZZ-UP')).toBeInTheDocument();
  });

  it('renders nothing if version is not found', () => {
    (useAtomValue as jest.Mock)
      .mockReturnValueOnce(mockVersionList) // atomGameVersionList
      .mockReturnValueOnce(mockLatestVersion); // atomGameVersionLatest
    const { container } = render(<SkillTableTitleVersion versionId={99} />);
    expect(container).toBeEmptyDOMElement();
  });
});
