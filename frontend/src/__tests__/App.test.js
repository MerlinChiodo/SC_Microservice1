import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders mainpage', () => {
  render(<App />);
  const linkElement = screen.getByText(/Startseite/i);
  expect(linkElement).toBeInTheDocument();
});
