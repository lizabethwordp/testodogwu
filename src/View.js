/* istanbul ignore file */
import App from "./App";
import './index.css';
import SignUpPage2 from "./SignUpPage2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserView from "./UserView";
import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import UserView2 from "./UserView2"
import List from "./List"
import Edit from "./Edit"
import Update from "./Update"


export default function View() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signuppage2" element={<SignUpPage2 />} />
          <Route path="/userview" element={<UserView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userview2" element={<UserView2 />} />
          <Route path="/list" element={<List />} />
          {/* <Route path="/edit/:_id" element={<Edit />} />
          <Route path="/update/:_id" element={<Update />} /> */}
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
}
