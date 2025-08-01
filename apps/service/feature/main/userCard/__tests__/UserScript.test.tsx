
import { render, screen, fireEvent } from '@testing-library/react';
import UserScript from '../UserScript';
import { useTranslations } from 'next-intl';

jest.mock('next-intl');

describe('UserScript', () => {
  const mockUniqueId = 'test-unique-id';
  const mockAlert = jest.fn();
  const mockWrite = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    global.alert = mockAlert;
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        write: mockWrite,
      },
      writable: true,
    });
    global.ClipboardItem = jest.fn((data) => ({
      'text/plain': data['text/plain'],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the script text with unique ID', () => {
    render(<UserScript unique={mockUniqueId} />);
    const expectedText = `javascript:$.ajax({url:'https://sinupdater.nira.one',success:function(res){const div=document.createElement('div');div.innerHTML=res;const src=div.getElementsByTagName('script')[0].src;document.body.insertAdjacentHTML('afterend',res);$.getScript(src)}});window.sinUpdateToken=function(){return'${mockUniqueId}';}`;;
    expect(screen.getByText(new RegExp(mockUniqueId))).toBeInTheDocument();
  });

  it('copies text to clipboard and shows alert on click', async () => {
    render(<UserScript unique={mockUniqueId} />);
    fireEvent.click(screen.getByText(new RegExp(mockUniqueId)));

    expect(mockWrite).toHaveBeenCalledTimes(1);
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the promise to resolve
    expect(mockAlert).toHaveBeenCalledWith('main.user.script.click');
  });
});
