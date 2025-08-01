
import { render, screen } from '@testing-library/react';
import SkillBoxCell from '../SkillBoxCell';

describe('SkillBoxCell', () => {
  it('renders children correctly', () => {
    render(<SkillBoxCell>Test Cell Content</SkillBoxCell>);
    expect(screen.getByText('Test Cell Content')).toBeInTheDocument();
  });
});
