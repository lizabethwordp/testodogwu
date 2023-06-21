import { render, screen } from '@testing-library/react';
import UserView from '../UserView';

describe('UserView component', () => {
  const customers = {
    firstName: 'John',
    lastName: 'Doe',
    acctType: 'Savings',
    email: 'john.doe@example.com',
  };

  test('renders the component correctly', () => {
    render(<UserView customers={customers} />);
    
    // Assert that the full name is rendered correctly
    const fullName = customers.firstName + " " + customers.lastName;
    expect(screen.getByText(fullName)).toBeInTheDocument();
    
    // Assert that the account type is rendered correctly
    expect(screen.getByText('Savings Account')).toBeInTheDocument();
    
    // Assert that the email address is rendered correctly
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    
    // Assert that the account balance is rendered correctly
    expect(screen.getByText('$120,000')).toBeInTheDocument();
  });

  // Add more test cases to cover different scenarios

});
