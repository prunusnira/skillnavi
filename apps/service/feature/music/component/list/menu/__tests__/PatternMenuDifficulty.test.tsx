
import { render, screen, fireEvent } from '@testing-library/react';
import { PatternMenuDifficulty } from '../PatternMenuDifficulty';
import { usePatternDifficulty } from '../usePatternDifficulty';
import { useTranslations } from 'next-intl';
import { difficultySelector } from '@/feature/music/data/DifficultySelector';

jest.mock('../usePatternDifficulty');
jest.mock('next-intl');

jest.mock('@skillnavi/ui', () => ({
  Select: ({ options, value, onChange }) => (
    <select value={value} onChange={onChange}>
      {options.map(option => <option key={option.value} value={option.value}>{option.display}</option>)}
    </select>
  ),
}));

describe('PatternMenuDifficulty', () => {
  const mockOnChangeDifficulty = jest.fn();

  beforeEach(() => {
    (usePatternDifficulty as jest.Mock).mockReturnValue({
      currentDifficulty: '0',
      onChangeDifficulty: mockOnChangeDifficulty,
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders difficulty select with options', () => {
    render(<PatternMenuDifficulty />);

    expect(screen.getByText('music.menu.difficulty')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    difficultySelector.forEach(option => {
      expect(screen.getByText(option.display)).toBeInTheDocument();
    });
  });

  it('calls onChangeDifficulty on select change', () => {
    render(<PatternMenuDifficulty />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(mockOnChangeDifficulty).toHaveBeenCalledTimes(1);
  });
});
