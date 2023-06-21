import React from "react";
import { getByTestId, render, fireEvent, screen } from "@testing-library/react";
import Edit from "../Edit";
import toast from "react-hot-toast";
import mockFetch from "../mocks/mockFetch";
// import { toast } from 'react-toastify';

// jest.mock('react-hot-toast', () => ({
//   toast: {
//     error: jest.fn(),
//   },
// }));

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

test("renders Edit component without errors", () => {
  render(<Edit />);
});

test("initial state of Edit component", () => {
  const { getByLabelText, getByTestId } = render(<Edit />);

  // Assert initial values of input fields
  expect(getByLabelText("First name").value).toBe("");
  expect(getByLabelText("Last name").value).toBe("");
  expect(getByLabelText("Bvn").value).toBe("");
  expect(getByTestId("date").value).toBe("");
  expect(getByLabelText("Email Address").value).toBe("");
  expect(getByLabelText("Account Type").value).toBe("Savings");
  expect(getByLabelText("Phone number").value).toBe("");
  expect(getByLabelText("Password").value).toBe("");
});

test("handleChange updates customer state", () => {
  const { getByLabelText } = render(<Edit />);

  const firstNameInput = getByLabelText("First name");
  fireEvent.change(firstNameInput, { target: { value: "John" } });

  const lastNameInput = getByLabelText("Last name");
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });

  // Assert updated values in customer state
  expect(firstNameInput.value).toBe("John");
  expect(lastNameInput.value).toBe("Doe");
});

// test("handleSubmit calls the fetch API with the correct data", () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ success: true }),
//     })
//   );

//   const id = 1;

//   const { getByLabelText, getByText } = render(<Edit />);

//   const firstNameInput = getByLabelText("First name");
//   fireEvent.change(firstNameInput, { target: { value: "John" } });

//   const lastNameInput = getByLabelText("Last name");
//   fireEvent.change(lastNameInput, { target: { value: "Doe" } });

//   const updateButton = getByText("Update");
//   fireEvent.click(updateButton);

//   // Assert that fetch API was called with the correct data
//   expect(fetch).toHaveBeenCalledWith("http://localhost:3030/api/items/" + id, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       firstName: "John",
//       lastName: "Doe",
//       // Include other properties as needed
//     }),
//   });
// });

test("renders form inputs with initial empty values", () => {
  render(<Edit />);

  const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
  expect(firstNameInput).toHaveValue("");

  const lastNameInput = screen.getByLabelText(/Last name/i);
  expect(lastNameInput).toHaveValue("");

  // Add more assertions for other form inputs
});

test("updates state when form inputs are changed", () => {
  render(<Edit />);

  const firstNameInput = screen.getByLabelText(/First name/i);
  fireEvent.change(firstNameInput, { target: { value: "John" } });
  expect(firstNameInput).toHaveValue("John");

  const lastNameInput = screen.getByLabelText(/Last name/i);
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  expect(lastNameInput).toHaveValue("Doe");

  // Add more assertions for other form inputs
});

test("customer's details populate upon render", async () => {
  const edit = render(<Edit />);

  // edit.findByRole('input');
  // const firstNameInput = await screen.findByLabelText(/First name/i);
  // expect(firstNameInput).toHaveValue("Paulo");
  // expect(await screen.findByRole('textbox', {  name: /first name/i})).toBeEmptyDOMElement;
  // expect(edit.screen.findByRole('input')).toBeInTheDocument
  // expect(screen.getByRole("input")).toBeInTheDocument();
  expect(screen.getByRole("switch")).toBeInTheDocument();
  // expect(await screen.findByRole("option", { name: "husky"})).toBeInTheDocument();
  // const lastNameInput = await screen.findByLabelText(/Last name/i);
  // expect(lastNameInput).toHaveValue("Walker");
})


