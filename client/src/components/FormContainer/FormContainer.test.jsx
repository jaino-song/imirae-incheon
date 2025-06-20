import { render, screen, fireEvent } from '@testing-library/react';
import FormContainer from './FormContainer';

// Mock the useClipboard hook
jest.mock('../hooks/useClipboard', () => ({
  __esModule: true,
  default: () => ({
    copyToClipboard: jest.fn(),
  }),
}));

describe('FormContainer', () => {
  const mockMsg = 'Test message';
  const mockProps = {
    msg: mockMsg,
    isGrayedOut: false,
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders with initial message', () => {
    render(<FormContainer {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(mockMsg);
  });

  it('updates text when user types', () => {
    render(<FormContainer {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    const newText = 'New test message';
    
    fireEvent.change(textarea, { target: { value: newText } });
    expect(textarea).toHaveValue(newText);
  });

  it('calls copyToClipboard when copy button is clicked', () => {
    const { copyToClipboard } = require('../hooks/useClipboard').default();
    render(<FormContainer {...mockProps} />);
    
    const copyButton = screen.getByText('메시지 복사');
    fireEvent.click(copyButton);
    
    expect(copyToClipboard).toHaveBeenCalledWith(mockMsg);
  });

  it('updates text when props.msg changes', () => {
    const { rerender } = render(<FormContainer {...mockProps} />);
    const newMsg = 'Updated message';
    
    rerender(<FormContainer {...mockProps} msg={newMsg} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(newMsg);
  });

  it('applies grayed out styles when isGrayedOut is true', () => {
    render(<FormContainer {...mockProps} isGrayedOut={true} />);
    const container = screen.getByRole('textbox').parentElement;
    
    expect(container).toHaveStyle({
      opacity: '0.5',
      filter: 'grayscale(100%)',
      pointerEvents: 'none',
    });
  });
}); 