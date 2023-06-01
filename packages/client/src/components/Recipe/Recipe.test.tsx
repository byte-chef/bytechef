import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';

describe('Recipe', () => {
  it('renders recipe', () => {
    render(<Recipe />);

    screen.debug();
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();

    // check if App components renders headline
  });
});
