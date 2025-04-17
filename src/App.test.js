import { render, screen } from '@testing-library/react';
import App from './App';

test('Download', () => {
  render(<App />);

  const linkElement = screen.getByText(/Download/i);
  expect(linkElement).toBeInTheDocument();
});
