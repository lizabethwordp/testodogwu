import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function List() {
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.get("http://localhost:3030/api/items")
          .then((response) => {
            setCustomers(response.data);
            // console.log(customers);
            // console.log(response);
          });
      } catch (error) {
        toast.error(error.message);
        // console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const editCustomer = (e, id) => {
    e.preventDefault();
  window.location.href = `/edit/${id}`
  };

  const deleteCustomer = (e, id) => {
    e.preventDefault();
    // console.log(_id)
    // console.log(id)
    axios
      .delete(`http://localhost:3030/api/items/${id}`)
      .then((response) => {
        toast.error(response.message);
        if (customers) {
          setCustomers((prevElement) => {
            return prevElement.filter((customer) => customer.id !== id);
          });
        }
      });
  };

  const img1 = (
    <svg
      className="h-12 w-12 text-gray-300"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clip-rule="evenodd"
      />
    </svg>
  );

  return (
    <>
      {!loading && (
        <ul className="divide-y divide-green-400 px-15 pb-10" name="unorderedlist">
          {customers.map((customer) => (
            <li
              // key={customer._id}
              key={customer.id}
              className="flex justify-between gap-x-6 py-5"
              data-testid="list-item"
            >
              <div className="flex gap-x-4">
                {img1}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-green-900">
                    {customer.firstName + " " + customer.lastName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-green-500">
                    {customer.email}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex  sm:items-end">
                <button
                  // onClick={(e, _id) => editCustomer(e, customer._id)}
                  onClick={(e, id) => editCustomer(e, customer.id)}
                  // href="#"
                  data-testid="edit-element"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 items-center mr-4"
                >
                  Edit
                </button>
                <button
                  // onClick={(e, _id) => deleteCustomer(e, customer._id)}
                  onClick={(e, id) => deleteCustomer(e, customer.id)}
                  // href="#"
                  data-testid="delete-element"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 items-center"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
