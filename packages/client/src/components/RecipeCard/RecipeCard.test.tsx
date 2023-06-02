import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

describe('RecipeCard', () => {
  it('renders recipe card', () => {
    render(<RecipeCard />);

    screen.debug();
    const headline = screen.getByText('Breakfast (55 mins)');
    expect(headline).toBeInTheDocument();

    // check if App components renders headline
  });
});
