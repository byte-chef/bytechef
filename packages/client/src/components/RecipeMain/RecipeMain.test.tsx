import { render, screen } from '@testing-library/react';
import RecipeMain from './RecipeMain.tsx';
import { useRecipe } from '../../hooks/useRecipe.tsx';

describe('Recipe', () => {
  it('renders recipe', () => {
    render(<RecipeMain recipe={useRecipe('123').recipe} />);

    screen.debug();
    const title = screen.getByText('Banana Floaties');
    expect(title).toBeInTheDocument();

    // check if App components renders headline
  });
});
