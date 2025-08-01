
import { render, screen, fireEvent } from '@testing-library/react';
import { MainFloatingMenu } from '../MainFloatingMenu';
import useNavbar from '../useNavbar';

jest.mock('../useNavbar');

describe('MainFloatingMenu', () => {
  it('calls controlMenu on click', () => {
    const mockControlMenu = jest.fn();
    (useNavbar as jest.Mock).mockReturnValue({ controlMenu: mockControlMenu });

    render(<MainFloatingMenu />);

    const menuButton = screen.getByRole('img', { hidden: true }); // FontAwesomeIcon renders as svg, which has role img
    fireEvent.click(menuButton);

    expect(mockControlMenu).toHaveBeenCalledTimes(1);
  });
});
