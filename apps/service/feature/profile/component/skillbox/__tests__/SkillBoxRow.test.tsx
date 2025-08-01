
import { render, screen } from '@testing-library/react';
import SkillBoxRow from '../SkillBoxRow';

describe('SkillBoxRow', () => {
  it('renders children correctly', () => {
    render(<SkillBoxRow><div>Test Row Content</div></SkillBoxRow>);
    expect(screen.getByText('Test Row Content')).toBeInTheDocument();
  });
});
