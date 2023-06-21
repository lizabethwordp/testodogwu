import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import odogwu from "./ODOGWU.svg";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserView({ customers }) {

  return (
    <>
      {/* <Navbar /> */}
      <div className="mx-auto">
        <div className="px-4 sm:px-0">
          {/* <h3 className="text-base font-semibold leading-7 text-gray-900">odogwu</h3> */}
          {/* <img className="mx-auto h-10 w-auto" src={odogwu} alt="ODOGWU Plc" /> */}
          <p className="mt-6 max-w-2xl text-lg leading-6 text-gray-500 ml-12">
            Personal details.
          </p>
        </div>
        <div className="mt-6 ml-12 border-t w-auto mx-auto justify-center inset-0 border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-large leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-lg font-large leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customers.firstName + " " + customers.lastName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-large leading-6 text-gray-900">
                Account Type
              </dt>
              <dd className="mt-1 text-lg font-large leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customers.acctType} Account
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-large leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-lg font-large leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customers.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-large leading-6 text-gray-900">
                Account Balance
              </dt>
              <dd className="mt-1 text-lg font-large leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                $120,000
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
