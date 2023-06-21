import { render, screen } from '@testing-library/react';
import UserView2 from '../UserView2';

describe('UserView2 component', () => {
  test('renders the component correctly with user data', () => {
    render(<UserView2 />);
    
    // Assert that the user's name is rendered correctly
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    
    // Assert that the user's email is rendered correctly
    expect(screen.getByText('Bank Statement')).toBeInTheDocument();
    
    // Assert that the user's image is rendered correctly
    const userImage = screen.getAllByRole('img');
    expect(userImage[0]).toBeInTheDocument();
    expect(userImage[1]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  });

  // Add more test cases to cover different scenarios
  test('updates state correctly after api call', async () => {
    render(<UserView2 />);
  })

});
