import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders header', () => {
    render(<Header />);

    screen.debug();
    const headline = screen.getByText('Byte-Chef');
    expect(headline).toBeInTheDocument();

    // check if App components renders headline
  });
});
