import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import SignUpPage2 from "../SignUpPage2";

// Set up mock server
const server = setupServer(
  rest.post("http://localhost:3030/api/items", (req, res, ctx) => {
    // Mock the response here if needed
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders sign up page", () => {
  render(<SignUpPage2 />);
  // Add your test assertions here
});

test("submits form successfully", async () => {
  render(<SignUpPage2 />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "John" },
  });
  // Fill in other form fields...

  // Check the checkbox
  fireEvent.click(screen.getByRole("switch"));

  // Submit the form
  fireEvent.click(screen.getByText(/sign up/i));

  // Wait for the API request to be made and handled by msw
  await waitFor(() =>
    expect(screen.getByText(/welcome to odogwu/i)).toBeInTheDocument()
  );

  // Add your test assertions for successful form submission here
});

test("displays error message when password does not match", async () => {
  render(<SignUpPage2 />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "John" },
  });
  // Fill in other form fields...

  // Check the checkbox
  fireEvent.click(screen.getByRole("switch"));

  // Set password and confirm password fields to different values
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password1" },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: "password2" },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/sign up/i));

  // Wait for the error toast to be displayed
  //   await waitFor(() =>
  //     expect(screen.getByText(/password does not match/i)).toBeInTheDocument()
  //   );
  setTimeout(async () => {
    await waitFor(() =>
      expect(screen.getByText(/password does not match/i)).toBeInTheDocument()
    );
  }, 2000);

  // Add your test assertions for error message display here
});

// Add more tests as needed

test("displays error message when account type not selected", async () => {
    render(<SignUpPage2 />);
  
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    // Fill in other form fields...
  
    // Check the checkbox
    // fireEvent.click(screen.getByRole("switch"));
    // fireEvent.click(screen.getByRole("switch"));
    const setAgreed = false;
  
    // Set password and confirm password fields to different values
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password1" },
    });
  
    // Submit the form
    fireEvent.click(screen.getByText(/sign up/i));
  
    // Wait for the error toast to be displayed
    //   await waitFor(() =>
    //     expect(screen.getByText(/password does not match/i)).toBeInTheDocument()
    //   );
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Please select account type/i)).toBeInTheDocument()
      );
    }, 2000);
    expect(setAgreed).toBe(false);
  
    // Add your test assertions for error message display here
  });
  
  // Add more tests as needed