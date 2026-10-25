import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 – Airbnb',
  description:
    'Luxurious 1BHK apartment with private Jacuzzi, pool, and gym in Candolim, Goa. Perfect romantic getaway for couples.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
