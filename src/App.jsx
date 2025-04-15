import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/FogotPassword";
import Products from "./pages/Products";
import HomeSliderBanners from "./pages/HomeSliderBanners";
import Categories from "./pages/Categories";
import SubCategory from "./pages/Categories/subCategory";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/Products/productDetails";
import AddFlavor from "./pages/Products/addFlavor";
import AddWeight from "./pages/Products/addWeight";
import BlogList from "./pages/Blog";

const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: ""
  });

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
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <Products />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/banners",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <HomeSliderBanners />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/categories",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <Categories />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/sub-category",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <SubCategory />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <Users />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <Orders />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <Profile />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <ProductDetails />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/products/add-flavor",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <AddFlavor />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/products/add-weight",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <AddWeight />
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/blogs",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="content-main flex">
              <Sidebar />
              <BlogList />
            </div>
          </section>
        </>
      ),
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res) => {
        setUserData(res.data);
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
  }

  const openAlertBox = (status, message) => {
    if (status === "success") {
      toast.success(message);
    }

    if (status === "error") {
      toast.error(message);
    }
  };

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    openAlertBox,
    userData,
    setUserData,
    catData,
    setCatData,
    getCat,
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />

      <Toaster />
    </myContext.Provider>
  );
}

export default App;

export { myContext };
