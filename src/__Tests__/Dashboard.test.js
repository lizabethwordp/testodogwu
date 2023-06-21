import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import List from '../List';

jest.mock('../List', () => {
  return jest.fn(() => <div data-testid="list-component">List Component</div>);
});


test('should render the Admin Dashboard heading', () => {
  render(<Dashboard />);
  const headingElement = screen.getByRole('heading', {  name: /admin dashboard/i});
  expect(headingElement).toBeInTheDocument();
});

test('should render the main content', () => {
  render(<Dashboard />);
  const listComponent = screen.getByTestId('list-component');
  expect(listComponent).toBeInTheDocument();
});

test('should render the navigation links', () => {
  render(<Dashboard />);
  const navigationLinks = screen.getAllByRole('link');
  expect(navigationLinks.length).toBeGreaterThan(0);
});

test('should render the list component', () => {
  render(<Dashboard />);
  const listComponent = screen.getByTestId('list-component');
  expect(listComponent).toBeInTheDocument();
  expect(List).toHaveBeenCalledTimes(1);
});

// test('renders a list of navigation items', async () => {
//   render(<Dashboard />)
//   const navigations = await screen.findAllByRole('listitem');
//   expect(navigations).toHaveLength(5);
// })
