import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Note Keeper title and New Note button', () => {
  render(<App />);
  expect(screen.getByText(/Note Keeper/i)).toBeInTheDocument();
  expect(screen.getAllByText(/\+ New Note/i)[0]).toBeInTheDocument();
});
