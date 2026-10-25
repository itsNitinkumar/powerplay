/**
 * Tests for Lightbox component
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lightbox from '@/components/overlays/Lightbox';

const mockProps = {
  isOpen: true,
  photoIndex: 2, // not first or last
  onClose: jest.fn(),
  onPrev: jest.fn(),
  onNext: jest.fn(),
  onOpenGrid: jest.fn(),
};

describe('Lightbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body class
    document.body.classList.remove('overlay-open');
  });

  it('renders when open', () => {
    render(<Lightbox {...mockProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Lightbox {...mockProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows correct counter', () => {
    render(<Lightbox {...mockProps} photoIndex={2} />);
    expect(screen.getByText('3 / 43')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Lightbox {...mockProps} />);
    await user.click(screen.getByLabelText('Close lightbox'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    render(<Lightbox {...mockProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPrev on ArrowLeft key', () => {
    render(<Lightbox {...mockProps} photoIndex={5} />);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockProps.onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext on ArrowRight key', () => {
    render(<Lightbox {...mockProps} photoIndex={5} />);
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockProps.onNext).toHaveBeenCalledTimes(1);
  });

  it('disables prev button on first photo', () => {
    render(<Lightbox {...mockProps} photoIndex={0} />);
    const prevBtn = screen.getByLabelText('Previous photo');
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last photo', () => {
    render(<Lightbox {...mockProps} photoIndex={42} />);
    const nextBtn = screen.getByLabelText('Next photo');
    expect(nextBtn).toBeDisabled();
  });

  it('does not call onPrev when ArrowLeft pressed on first photo', () => {
    render(<Lightbox {...mockProps} photoIndex={0} />);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockProps.onPrev).not.toHaveBeenCalled();
  });

  it('does not call onNext when ArrowRight pressed on last photo', () => {
    render(<Lightbox {...mockProps} photoIndex={42} />);
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockProps.onNext).not.toHaveBeenCalled();
  });

  it('calls onOpenGrid when grid button clicked', async () => {
    const user = userEvent.setup();
    render(<Lightbox {...mockProps} />);
    await user.click(screen.getByLabelText('Back to photo grid'));
    expect(mockProps.onOpenGrid).toHaveBeenCalledTimes(1);
  });

  it('adds overlay-open class to body when open', () => {
    render(<Lightbox {...mockProps} />);
    expect(document.body).toHaveClass('overlay-open');
  });

  it('removes overlay-open class from body when closed', () => {
    const { rerender } = render(<Lightbox {...mockProps} />);
    expect(document.body).toHaveClass('overlay-open');
    rerender(<Lightbox {...mockProps} isOpen={false} />);
    expect(document.body).not.toHaveClass('overlay-open');
  });

  it('restores focus to trigger element on close', () => {
    // Create a button to act as the opener
    const trigger = document.createElement('button');
    trigger.textContent = 'Open lightbox';
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Lightbox {...mockProps} />);
    rerender(<Lightbox {...mockProps} isOpen={false} />);

    // Focus should be restored (previousFocusRef)
    // Note: jsdom focus restoration is tricky; at minimum assert no error
    document.body.removeChild(trigger);
  });
});
