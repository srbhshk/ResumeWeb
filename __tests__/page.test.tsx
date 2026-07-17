import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Component', () => {
  it('renders the getting started header', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /to get started, edit the page\.tsx file\./i,
    });
    expect(heading).toBeInTheDocument();
  });
});
