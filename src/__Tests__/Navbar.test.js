import { fireEvent, render, screen, userEvent } from "@testing-library/react"
// import App from '../App';
import Navbar from "../Navbar";
// import Sliding from "../Sliding";
// import Landing from "../Landing";
// import { Swiper, SwiperSlide } from "swiper/react";

// test('should render Sliding component', () => {
//   render(<App />);
//   const slidingComponent = screen.getByRole('Sliding');
//   expect(slidingComponent).toBeInTheDocument();
// });

// test('should render Landing component', () => {
//   render(<App />);
//   const landingComponent = screen.getByRole('Landing');
//   expect(landingComponent).toBeInTheDocument();
// });

// test('should render overlay', () => {
//   render(<App />);
//   const overlayElement = screen.getByTestId('overlay');
//   expect(overlayElement).toBeInTheDocument();
// });

// test('should have "content" className for Landing component', () => {
//   render(<App />);
//   const landingComponent = screen.getByRole('Landing');
//   expect(landingComponent).toHaveClass('content');
// });


test('renders log out', () => {
  render(<Navbar />);
  // const linkElement = screen.getByText('Sign');
  expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
});

test('renders Bank Statement', () => {
  render(<Navbar />);
  expect(screen.getByText(/Bank Statement/i)).toBeInTheDocument();
});

test('renders Transaction History', () => {
  render(<Navbar />);
  expect(screen.getByText(/Transaction History/i)).toBeInTheDocument();
});

test('renders Financing Options', () => {
  render(<Navbar />);
  expect(screen.getByText(/Financing Options/i)).toBeInTheDocument();
});

test('renders without errors', () => {
  render(<Navbar />);
});

test('renders navigation items correctly', () => {
  const navigation = [
    { name: "Log Out", href: "/", current: true },
    { name: "Bank Statement", href: "#", current: false },
    { name: "Transaction History", href: "#", current: false },
    { name: "Financing Options", href: "#", current: false },
  ];
  
  render(<Navbar navigation={navigation} />);
  
  navigation.forEach((item) => {
    const link = screen.getByText(item.name);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.href);
    
    if (item.current) {
      expect(link).toHaveAttribute('aria-current', 'page');
    } else {
      expect(link).not.toHaveAttribute('aria-current');
    }
  });
});

test('profile dropdown menu items work correctly', () => {
  render(<Navbar />);
  
  const profileButton = screen.getByTestId('img-element')
  
  // Open the profile dropdown menu
  fireEvent.click(profileButton);
  
  // Assert that the dropdown menu items are rendered correctly
  const profileLink = screen.getByText('Your Profile');
  expect(profileLink).toBeInTheDocument();
  expect(profileLink).toHaveAttribute('href', '#');
  
  const settingsLink = screen.getByText('Settings');
  expect(settingsLink).toBeInTheDocument();
  expect(settingsLink).toHaveAttribute('href', '#');
  
  const signOutLink = screen.getByText('Sign out');
  expect(signOutLink).toBeInTheDocument();
  expect(signOutLink).toHaveAttribute('href', '#');
  
  // Simulate clicking one of the menu items
  fireEvent.click(signOutLink);
  
  // Assert that the expected behavior happens after clicking
  // For example, a sign-out action might be triggered
});



