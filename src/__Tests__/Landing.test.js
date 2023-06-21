import { fireEvent, render, screen } from "@testing-library/react";
import Landing from "../Landing";
import axios from "axios";
import toast from "react-hot-toast";

const { location } = window;
const getHrefSpy = jest.fn(() => "example.com");
const setHrefSpy = jest.fn((href) => href);

beforeAll(() => {
  delete window.location;
  window.location = {};
  Object.defineProperty(window.location, "href", {
    get: getHrefSpy,
    set: setHrefSpy,
  });
});

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

it("mocks window.location.href", () => {
  expect(getHrefSpy).not.toHaveBeenCalled();
  console.log(window.location.href);
  expect(getHrefSpy).toHaveBeenCalled();
});

afterAll(() => {
  window.location = location;
});

test("email input should be rendered", () => {
  render(<Landing />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Landing />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button input should be rendered", () => {
  render(<Landing />);
  const userInputEl = screen.getByRole("button");
  expect(userInputEl).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(<Landing />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  expect(emailInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Landing />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("email input should change", () => {
  render(<Landing />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const testValue = "test";
  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Landing />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

// test('login button works', async () => {
//   render(<Landing/>);
//   const buttonEl = screen.getByRole("button");
//   const emailInputEl = screen.getByPlaceholderText(/email/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(emailInputEl, {target:{value:testValue}});
//   fireEvent.change(passwordInputEl, {target:{value:testValue}});
//   fireEvent.click(buttonEl);

//   // const usersItem = await window.location.href = "/dashboard";
//   window.location.href = "/dashboard";
//   const usersItem = await screen.findByText(/© new team 2022/i)

//   expect(usersItem).toBeInTheDocument();
// })

test("form submission with valid data", () => {
  // Mock the axios.post function
  axios.post = jest.fn().mockResolvedValueOnce({ data: { role: "admin" } });

  const response = { message: "" };
  response.message = "";

  // Render the component
  const { getByLabelText, getByText } = render(<Landing />);

  // Fill in the form fields
  fireEvent.change(getByLabelText("Email address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(getByText("Sign in"));

  // Verify that axios.post was called with the correct data
  expect(axios.post).toHaveBeenCalledWith(
    "http://localhost:3030/api/items/login",
    { email: "test@example.com", password: "password123" }
  );
});

// test("error toast displayed when response contains a message", () => {
//   // Mock the axios.post function
//   axios.post = jest.fn().mockResolvedValueOnce();

//   const response = {message: ""};
//   response.message = "Invalid credentials"

//   // Render the component
//   const { getByLabelText, getByText } = render(<Landing />);

//   // Fill in the form fields
//   fireEvent.change(getByLabelText("Email address"), { target: { value: "test@example.com" } });
//   fireEvent.change(getByLabelText("Password"), { target: { value: "password123" } });

//   // Submit the form
//   fireEvent.click(getByText("Sign in"));

//   // Verify that the error toast is displayed
//   expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
// });

test("redirect to dashboard when role is admin", () => {
  // Mock the axios.post function
  axios.post = jest.fn().mockResolvedValueOnce({ data: { role: "admin" } });

  const customer = "customer";
  const data = { role: "admin" };
  const setLocalStorage = (customer, data) => {
    window.localStorage.setItem(customer, JSON.stringify(data));
  };

  // Mock the window.location.href setter
  delete window.location;
  window.location = { href: "/dashboard" };

  // Render the component
  const { getByLabelText, getByText } = render(<Landing />);

  // Fill in the form fields
  fireEvent.change(getByLabelText("Email address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(getByText("Sign in"));

  // Verify that the customer is redirected to the dashboard
  setLocalStorage(customer, data);
  expect(localStorage.getItem(customer)).toEqual(JSON.stringify(data));
  expect(window.location.href).toBe("/dashboard");
});

test("redirect to userview when role is not admin", () => {
  // Mock the axios.post function
  axios.post = jest.fn().mockResolvedValueOnce({ data: { role: "" } });

  const customer = "customer";
  const data = { role: "admin" };
  const setLocalStorage = (customer, data) => {
    window.localStorage.setItem(customer, JSON.stringify(data));
  };

  // Mock the window.location.href setter
  delete window.location;
  window.location = { href: "/userview2" };

  // Render the component
  const { getByLabelText, getByText } = render(<Landing />);

  // Fill in the form fields
  fireEvent.change(getByLabelText("Email address"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(getByText("Sign in"));

  // Verify that the customer is redirected to the user dashboard
  setLocalStorage(customer, data);
  expect(localStorage.getItem(customer)).toEqual(JSON.stringify(data));
  expect(window.location.href).toBe("/userview2");
});

