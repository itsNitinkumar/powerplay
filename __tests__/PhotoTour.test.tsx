/**
 * Tests for PhotoTour component
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoTour from '@/components/overlays/PhotoTour';

const mockProps = {
  isOpen: true,
  onClose: jest.fn(),
  onOpenLightbox: jest.fn(),
  startCategory: undefined,
};

describe('PhotoTour', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.classList.remove('overlay-open');
  });

  it('renders when open', () => {
    render(<PhotoTour {...mockProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Photo tour')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<PhotoTour {...mockProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows category chips', () => {
    render(<PhotoTour {...mockProps} />);
    expect(screen.getAllByText('Jacuzzi / Bathroom').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Living room').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bedroom').length).toBeGreaterThan(0);
  });

  it('shows gallery images', () => {
    render(<PhotoTour {...mockProps} />);
    const images = screen.getAllByRole('button', { name: /open photo/i });
    expect(images.length).toBeGreaterThan(0);
  });

  it('calls onClose when back button clicked', async () => {
    const user = userEvent.setup();
    render(<PhotoTour {...mockProps} />);
    await user.click(screen.getByLabelText('Close photo tour and go back'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    render(<PhotoTour {...mockProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenLightbox when photo clicked', async () => {
    const user = userEvent.setup();
    render(<PhotoTour {...mockProps} />);
    const photos = screen.getAllByRole('button', { name: /open photo/i });
    await user.click(photos[0]);
    expect(mockProps.onOpenLightbox).toHaveBeenCalledWith(expect.any(Number));
  });

  it('adds overlay-open class when open', () => {
    render(<PhotoTour {...mockProps} />);
    expect(document.body).toHaveClass('overlay-open');
  });

  it('removes overlay-open when closed', () => {
    const { rerender } = render(<PhotoTour {...mockProps} />);
    rerender(<PhotoTour {...mockProps} isOpen={false} />);
    expect(document.body).not.toHaveClass('overlay-open');
  });
});
