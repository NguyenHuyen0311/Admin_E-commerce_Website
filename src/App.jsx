import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/FogotPassword";

const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
                <Sidebar />
                <Dashboard />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/register",
      exact: true,
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/verify",
      exact: true,
      element: (
        <>
          <Verify />
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
  ]);
  
  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />
    </myContext.Provider>
  );
}

export default App;

export { myContext };
