import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders headline', () => {
    render(<Header />);

    screen.debug();
    const headline = screen.getByText('Header');
    expect(headline).toBeInTheDocument();

    // check if App components renders headline
  });
});
