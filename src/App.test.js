import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2025, 3, 1));
});

afterAll(() => {
  jest.useRealTimers();
});

test('App', () => {
  const element = render(<App />).asFragment();

  expect(element).toMatchSnapshot();
});
