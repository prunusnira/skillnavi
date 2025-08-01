
import { render, screen, fireEvent } from '@testing-library/react';
import { PatternMenuRank } from '../PatternMenuRank';
import { usePatternRank } from '../usePatternRank';
import { useTranslations } from 'next-intl';

jest.mock('../usePatternRank');
jest.mock('next-intl');

jest.mock('@skillnavi/ui/src/checkbox/component/Checkbox', () => ({
  Checkbox: ({ items, action }) => (
    <div>
      {items.map(item => (
        <label key={item.value}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => action(item.value, !item.checked)}
          />
          {item.display}
        </label>
      ))}
    </div>
  ),
}));

describe('PatternMenuRank', () => {
  const mockOnChangeRank = jest.fn();
  const mockCheckboxOptions = [
    { value: 'S', display: 'S Rank', checked: false },
    { value: 'A', display: 'A Rank', checked: true },
  ];

  beforeEach(() => {
    (usePatternRank as jest.Mock).mockReturnValue({
      checkboxOptions: mockCheckboxOptions,
      onChangeRank: mockOnChangeRank,
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders rank checkboxes', () => {
    render(<PatternMenuRank />);

    expect(screen.getByText('music.menu.rank')).toBeInTheDocument();
    expect(screen.getByLabelText('S Rank')).toBeInTheDocument();
    expect(screen.getByLabelText('A Rank')).toBeInTheDocument();
    expect(screen.getByLabelText('A Rank')).toBeChecked();
    expect(screen.getByLabelText('S Rank')).not.toBeChecked();
  });

  it('calls onChangeRank on checkbox change', () => {
    render(<PatternMenuRank />);
    fireEvent.click(screen.getByLabelText('S Rank'));
    expect(mockOnChangeRank).toHaveBeenCalledWith('S', true);
  });
});
