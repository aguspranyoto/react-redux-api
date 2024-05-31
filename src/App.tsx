import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import UserList from "./components/User/UserList";
import UserDetail from "./components/User/UserDetail";
import CreateForm from "./components/User/CreateForm";
import UpdateForm from "./components/User/UpdateForm";

import UserLayout from "./components/User/UserLayout";
import GuestLayout from "./components/Guest/GuestLayout";
import UserForm from "./components/User/UserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-6">
        <Routes>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserList />}></Route>
            <Route path="/user/:id" element={<UserDetail />}></Route>
            {/* <Route path="/user/create" element={<CreateForm />}></Route> */}
            {/* <Route path="/user/update/:id" element={<UpdateForm />}></Route> */}
            <Route
              path="/user/create"
              element={<UserForm isEditForm={false} />}
            ></Route>
            <Route
              path="/user/update/:id"
              element={<UserForm isEditForm={true} />}
            ></Route>
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
