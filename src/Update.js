/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import React from "react";
import odogwu from "./ODOGWU1.svg";
import "./index.css";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Update() {
  // const { _id } = useParams();
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = React.useState({
    // _id: _id,
    id: id,
    firstName: "",
    lastName: "",
    bvn: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    acctType: "Savings",
    role: ""
  });
  // console.log(customer);
  // console.log(_id)
  // console.log(id)

  // const navigate = useNavigate();

  function handleChange(event) {
    // console.log(event);
    const { name, value, type, checked } = event.target;

    setCustomer((prevcustomer) => {
      return {
        ...prevcustomer,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // await fetch(`http://localhost:5000/api/employees/${_id}`, {
        // await fetch(`http://localhost:3030/api/items/`+id, {
        await fetch(`http://localhost:4040/users/`+id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(customer),
        })
          .then((response) => response.json())
          .then((json) => {
            setCustomer(json);
            // console.log(customer);
            // console.log(json);
          });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [errorMessage, setErrorMessage] = React.useState("");
  console.log(errorMessage);

  console.log(customer)

  function handleSubmit(event) {
    event.preventDefault();
    if (!agreed) {
      toast.error("Please slide toggle to make change(s).");
    } else {
      if (customer.acctType) {
        if (customer.password === customer.confirmPassword) {
          // fetch(`http://localhost:5000/api/employees/${_id}`, {
          // fetch(`http://localhost:3030/api/items/`+id, {
          fetch(`http://localhost:4040/users/`+id, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              if (json.stack) {
                toast.error(json.message);
                console.log(json.message);
              } else {
                localStorage.setItem("customer", JSON.stringify(json));
                window.location.href = "/userview2";
              }
            })
            // .then(localStorage.setItem("customer", JSON.stringify(customer) ))
            .catch((error) => {
              toast.error(error);
              console.log(error);
            });
          // .then(navigate("/"))
        } else {
          setErrorMessage("Password does not match");
          toast.error(errorMessage);
        }
      } else {
        setErrorMessage("Please select account type");
        toast.error(errorMessage);
      }
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    window.location.href = "/userview2";
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#88F346] to-[#03543F] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
          Hi! {customer.firstName + " " + customer.lastName} Update your Details
        </h2>
        <p className="mt-2 text-lg leading-8 text-green-600">
          Enter intended details in the appropriate field and save.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        // onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                value={customer.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                value={customer.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="bvn"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Bvn
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="bvn"
                id="bvn"
                value={customer.bvn}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Date Of Birth
            </label>
            <div className="mt-2.5">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={customer.dateOfBirth}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Email Address
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={customer.email}
                onChange={handleChange}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="acctType"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Account Type
            </label>
            <div className="mt-2.5">
              <select
                type="email"
                name="acctType"
                id="acctType"
                value={customer.acctType}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              >
                {/* <option value="*">Select Account Type</option> */}
                <option>Savings</option>
                <option>Current</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={customer.phoneNumber}
                onChange={handleChange}
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                value={customer.password}
                onChange={handleChange}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-green-900"
            >
              Confirm Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={customer.confirmPassword}
                onChange={handleChange}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Message was here */}
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-green-600" : "bg-green-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-green-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-green-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-green-600">
              Please toggle to accept changes.
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mt-10">
            <button
              type="submit"
              onClick={handleSubmit}
              className="block w-full rounded-md bg-green-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Update
            </button>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={cancel}
              className="block w-full rounded-md bg-green-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
