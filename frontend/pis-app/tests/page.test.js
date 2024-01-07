import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/main-page/footer';

describe('Footer', () => {
  it('renders Footer', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const copyrightText = screen.getByText(/© Cinemania\. Projekt na przedmiot PIS\./i);
    expect(copyrightText).toBeInTheDocument();
  });
});
