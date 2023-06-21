import React from "react";
import { getByTestId, render, fireEvent, screen } from "@testing-library/react";
import Update from "../Update";
import toast from "react-hot-toast";

test("renders without error", () => {
  render(<Update />);
});

test("renders form fields with initial values", () => {
  render(<Update />);
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

test("updates form fields when user input is provided", () => {
  render(<Update />);
  const firstNameInput = screen.getByLabelText("First name");
  const lastNameInput = screen.getByLabelText("Last name");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });

  expect(firstNameInput.value).toBe("John");
  expect(lastNameInput.value).toBe("Doe");
});

// test("calls handleSubmit function on update button click", () => {
//   const handleSubmit = jest.fn();
//   render(<Update handleSubmit={handleSubmit} />);
//   const updateButton = screen.getByText("Update");

//   fireEvent.click(updateButton);

//   expect(handleSubmit).toHaveBeenCalledTimes(1);
// });

// test("calls cancel function on cancel button click", () => {
//   const cancel = jest.fn();
//   render(<Update cancel={cancel} />);
//   const cancelButton = screen.getByText("Cancel");

//   fireEvent.click(cancelButton);

//   expect(cancel).toHaveBeenCalledTimes(1);
// });


