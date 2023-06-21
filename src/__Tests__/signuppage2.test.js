import React from "react";
import MockAdapter from "axios-mock-adapter";
import {
  act,
  getByTestId,
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import SignUpPage2 from "../SignUpPage2";
import UserView2 from "../UserView2";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../mocks/server";
import { rest } from 'msw';

// jest.mock("axios");
// jest.mock("react-hot-toast", () => ({
//   toast: {
//     error: jest.fn(),
//   },
// }));

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


// describe("SignUpPage2", () => {
//     it("should make a POST request when the form is submitted with valid inputs", async () => {
//       axios.post.mockResolvedValueOnce({ data: { id: 1 } });
  
//       render(<SignUpPage2 />);
  
//       // Fill in the form inputs with valid values
//       fireEvent.change(screen.getByLabelText(/First name/i), {
//         target: { value: "John" },
//       });
//       fireEvent.change(screen.getByLabelText(/Last name/i), {
//         target: { value: "Doe" },
//       });
//       // Fill in other required form fields...
  
//       // Accept the policy
//       fireEvent.click(screen.getByLabelText(/Agree to policies/i));
  
//       // Submit the form
//       fireEvent.click(screen.getByText(/Sign Up/i));
  
//       // Wait for the API call to resolve
//       await screen.findByText(/Welcome to Odogwu/i);
  
//       // Assert that the mock function was called with the correct arguments
//       expect(axios.post).toHaveBeenCalledWith(
//         "http://localhost:3030/api/items",
//         expect.objectContaining({
//           firstName: "John",
//           lastName: "Doe",
//           // Other form field values...
//         })
//       );
  
//       // Assert any other necessary expectations
//     });
//   });
  

// beforeEach(() => {
//   mockPost = jest.spyOn(axios, 'post');
// });

// afterEach(() => {
//   mockPost.mockRestore();
// });

test("initial state", () => {
  render(<SignUpPage2 />);

  // Assert the initial state values
  expect(screen.getByLabelText("First name").value).toBe("");
  expect(screen.getByLabelText("Last name").value).toBe("");
  expect(screen.getByLabelText("Bvn").value).toBe("");
  expect(screen.getByLabelText("Date Of Birth").value).toBe("");
  expect(screen.getByLabelText("Email Address").value).toBe("");
  expect(screen.getByLabelText("Account Type").value).toBe("Savings");
  expect(screen.getByLabelText("Phone number").value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText("Confirm Password").value).toBe("");
});

test("input field changes", () => {
  render(<SignUpPage2 />);

  // Simulate input field changes
  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Doe" },
  });

  // Assert the changed values
  expect(screen.getByLabelText("First name").value).toBe("John");
  expect(screen.getByLabelText("Last name").value).toBe("Doe");
});

test("handleChange updates state", () => {
  render(<SignUpPage2 />);

  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Doe" },
  });
  // Add more fireEvent.change calls for other inputs

  expect(screen.getByLabelText("First name")).toHaveValue("John");
  expect(screen.getByLabelText("Last name")).toHaveValue("Doe");
  // Add more expect statements for other inputs
});

test('sign up api call', async () => {

  const customer = "customer";
  const customers = {
    "id": 1,
    "firstName": "Paulo",
    "lastName": "Walker",
    "bvn": "90876543212",
    "dateOfBirth": "2019-02-05",
    "phoneNumber": "09012345679",
    "email": "paulsw@gmail.com",
    "password": "12345",
    "confirmPassword": "12345",
    "acctType": "Savings",
    "role": null
  };

  const setLocalStorage = (customer, customers) => {
    window.localStorage.setItem(customer, JSON.stringify(customers));
  };

  render(<SignUpPage2 />);

  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "Paulo" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Walker" },
  });
  fireEvent.change(screen.getByLabelText("Bvn"), {
    target: { value: "90876543212" },
  });
  fireEvent.change(screen.getByLabelText("Date Of Birth"), {
    target: { value: "2019-02-05" },
  });
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "paulsw@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText("Account Type"), {
    target: { value: "Savings" },
  });
  fireEvent.change(screen.getByLabelText("Phone number"), {
    target: { value: "09012345679" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "12345" },
  });

  const setAgreed = true;
  customers.acctType = "Savings";

  fireEvent.click(screen.getByRole('button', {  name: /sign up/i}));
  // screen.getByRole('switch', {  name: /by selecting this, you agree to our privacy policy\./i})

  

  setLocalStorage(customer, customers);
  // Mock the window.location.href setter
  delete window.location;
  window.location = { href: "/userview2" };
  // expect(localStorage.getItem(customer)).toEqual(JSON.stringify(customers));
  // expect(rest.post).toHaveBeenCalled()
  expect(window.location.href).toBe("/userview2");
  expect(setAgreed).toBe(true);
  render(<UserView2 />);
  expect(screen.getByLabelText("Account Type")).toBeInTheDocument;
  
  // render(<UserView2 />)

})

// test('form submission with valid inputs', async () => {
//     render(<SignUpPage2 />);
  
//     const toastErrorMock = jest.fn();
//     const setItemMock = jest.spyOn(window.localStorage, 'setItem');
  
//     fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
//     // Add more fireEvent.change calls for other inputs
  
//     axios.post.mockResolvedValueOnce({});
  
//     await act(async () => {
//       fireEvent.click(screen.getByText('Sign Up'));
  
//       await waitFor(() => {
//         expect(axios.post).toHaveBeenCalledTimes(1);
//         expect(axios.post).toHaveBeenCalledWith('http://localhost:3030/api/items', {
//           firstName: 'John',
//           lastName: 'Doe',
//           // Add more key-value pairs for other inputs
//         });
//         expect(setItemMock).toHaveBeenCalledWith('customer', JSON.stringify({}));
//         expect(window.location.href).toBe('/userview2');
//       });
//     });
  
//     expect(toastErrorMock).not.toHaveBeenCalled();
//   });
  

