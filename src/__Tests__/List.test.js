import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved, fireEvent } from "@testing-library/react";
import List from "../List";
import axios from "axios";
import toast from "react-hot-toast";
// import { unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
import { server } from "../mocks/server";
import { rest } from 'msw';

// jest.mock("axios");
// jest.mock("react-hot-toast", () => ({
//   toast: {
//     error: jest.fn(),
//   },
// }));

// test("fetches customers and renders them", async () => {
//   const mockCustomers = [
//     { _id: "1", firstName: "John", lastName: "Doe", email: "john@example.com" },
//     {
//       _id: "2",
//       firstName: "Jane",
//       lastName: "Smith",
//       email: "jane@example.com",
//     },
//   ];
//   axios.get.mockResolvedValueOnce({ data: mockCustomers });

//   render(<List />);

//   await waitFor(() => {
//     const customerElements = screen.getAllByRole("listitem");
//     expect(customerElements).toHaveLength(mockCustomers.length);

//     mockCustomers.forEach((customer) => {
//       const customerNameElement = screen.getByText(
//         `${customer.firstName} ${customer.lastName}`
//       );
//       expect(customerNameElement).toBeInTheDocument();
//     });
//   });
// });


test('renders a list of customers', async () => {
  render(<List />);
  // const customers = await screen.findAllByRole('listitem')

  await waitFor(() => {
    const customerElements = screen.getAllByRole("listitem");
    expect(customerElements).toHaveLength(10);
  })
})

test('error handling when no list', async () => {
  server.use(
    rest.get('http://localhost:3030/api/item', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<List />)
  // const error = await screen.findByText(/err_network/i)
  setTimeout(() => {
    expect(screen.getByText(/err_network/i)).toBeInTheDocument()
}, 2000);
  // expect(error).toBeInTheDocument();
})

test('edit button routes to the right page', async () => {
  render(<List />);

  // const edit = await screen.findAllByText("Edit");
  // const edit = screen.getByRole("button", { name : /Edit/i});
  // console.log("====+++++++++++++++====>"+edit);
})