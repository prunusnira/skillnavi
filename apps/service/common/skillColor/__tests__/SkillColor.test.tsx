
import { render, screen, fireEvent } from '@testing-library/react';
import SkillColor from '../SkillColor';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';

jest.mock('@/feature/skill/api/getSkillCN');

describe('SkillColor', () => {
  beforeEach(() => {
    (getSkillCN as jest.Mock).mockImplementation((value) => `mock-skill-cn-${value}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the value formatted to two decimal places', () => {
    render(<SkillColor value={123.456} />);
    expect(screen.getByText('123.46')).toBeInTheDocument();
  });

  it('calls getSkillCN with value multiplied by multiplier', () => {
    render(<SkillColor value={100} multiplier={2} />);
    expect(getSkillCN).toHaveBeenCalledWith(200);
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<SkillColor value={50} onClick={handleClick} />);
    fireEvent.click(screen.getByText('50.00'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies externalStyleClass', () => {
    render(<SkillColor value={75} externalStyleClass="custom-style" />);
    expect(screen.getByText('75.00')).toHaveClass('custom-style');
  });

  it('applies skill-text class', () => {
    render(<SkillColor value={75} />);
    expect(screen.getByText('75.00')).toHaveClass('skill-text');
  });

  it('applies class from getSkillCN', () => {
    render(<SkillColor value={75} />);
    expect(screen.getByText('75.00')).toHaveClass('mock-skill-cn-75');
  });
});
