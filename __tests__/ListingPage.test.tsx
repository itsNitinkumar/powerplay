import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListingPage from '@/app/page';

describe('ListingPage Integration', () => {
  beforeEach(() => {
    // Reset body classes and scroll
    document.body.className = '';
    window.scrollY = 0;
  });

  it('renders listing title and main property details', () => {
    render(<ListingPage />);
    expect(
      screen.getByRole('heading', {
        name: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Entire apartment hosted by Mirashya/i)).toBeInTheDocument();
    expect(screen.getByText(/2 guests · 1 bedroom · 1 bed · 1 bath/i)).toBeInTheDocument();
  });

  it('toggles wishlist Save button state on click', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const saveBtn = screen.getByRole('button', { name: /save to wishlist/i });
    expect(saveBtn).toHaveAttribute('aria-pressed', 'false');

    await user.click(saveBtn);
    expect(screen.getByRole('button', { name: /remove from wishlist/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    await user.click(screen.getByRole('button', { name: /remove from wishlist/i }));
    expect(screen.getByRole('button', { name: /save to wishlist/i })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('opens photo tour when clicking "Show all photos"', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const showAllPhotosBtn = screen.getByRole('button', { name: /show all photos/i });
    await user.click(showAllPhotosBtn);

    // Photo tour overlay dialog should now be present
    expect(screen.getByRole('dialog', { name: /photo tour/i })).toBeInTheDocument();
  });

  it('opens lightbox when clicking hero image', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const heroBtn = screen.getByRole('button', {
      name: /open photo: Jacuzzi tub with blue lighting/i,
    });
    await user.click(heroBtn);

    // Lightbox dialog should open
    expect(screen.getByRole('dialog', { name: /photo 1 of 43/i })).toBeInTheDocument();
  });

  it('navigates from Photo Tour into Lightbox and back to Photo Tour', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);

    // Open photo tour
    await user.click(screen.getByRole('button', { name: /show all photos/i }));
    expect(screen.getByRole('dialog', { name: /photo tour/i })).toBeInTheDocument();

    // Click an image inside photo tour
    const tourImages = screen.getAllByRole('button', { name: /open photo:/i });
    await user.click(tourImages[0]);

    // Now in Lightbox
    expect(screen.getByRole('dialog', { name: /photo \d+ of 43/i })).toBeInTheDocument();

    // Click back to grid
    await user.click(screen.getByRole('button', { name: /back to photo grid/i }));

    // Should return to Photo Tour
    expect(screen.getByRole('dialog', { name: /photo tour/i })).toBeInTheDocument();

    // Close Photo Tour
    await user.click(screen.getByRole('button', { name: /close photo tour and go back/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('expands and collapses description text', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const descSection = screen.getByLabelText('Property description');
    const showMoreBtn = within(descSection).getByRole('button', { name: /show more/i });
    expect(showMoreBtn).toHaveAttribute('aria-expanded', 'false');

    await user.click(showMoreBtn);
    expect(within(descSection).getByRole('button', { name: /show less/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('opens amenities modal and displays all 50 amenities', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const openAmenitiesBtn = screen.getByRole('button', { name: /show all 50 amenities/i });
    await user.click(openAmenitiesBtn);

    expect(screen.getByRole('dialog', { name: /all amenities/i })).toBeInTheDocument();
    expect(screen.getByText('Standout amenities')).toBeInTheDocument();

    // Close modal
    await user.click(screen.getByRole('button', { name: /close amenities/i }));
    expect(screen.queryByRole('dialog', { name: /all amenities/i })).not.toBeInTheDocument();
  });

  it('triggers reserve button demo action with visible confirmation', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const reserveBtn = screen.getByRole('button', { name: /^reserve$/i });
    await user.click(reserveBtn);

    expect(
      screen.getByText(/Reservation request sent! You'll receive a confirmation/i)
    ).toBeInTheDocument();
  });

  it('triggers message host demo action with confirmation', async () => {
    const user = userEvent.setup();
    render(<ListingPage />);
    const msgBtn = screen.getByRole('button', { name: /message host/i });
    await user.click(msgBtn);

    expect(
      screen.getByText(/Message sent to Mirashya!/i)
    ).toBeInTheDocument();
  });
});
