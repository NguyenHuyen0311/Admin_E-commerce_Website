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
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import AddProduct from "./pages/Products/addProduct";
import HomeSliderBanners from "./pages/HomeSliderBanners";
import AddHomeSliderBanners from "./pages/HomeSliderBanners/addHomeSliderBanners";
import Categories from "./pages/Categories";
import AddCategory from "./pages/Categories/addCategory";
import SubCategory from "./pages/Categories/subCategory";
import AddSubCategory from "./pages/Categories/addSubCategory";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import Profile from "./pages/Profile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
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
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() =>
          setIsOpenFullScreenPanel({
            open: false,
          })
        }
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#f1f1f1",
            color: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                setIsOpenFullScreenPanel({
                  open: false,
                })
              }
              aria-label="close"
            >
              <IoMdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isOpenFullScreenPanel.model}
            </Typography>
          </Toolbar>
        </AppBar>

        {isOpenFullScreenPanel.model === "Thêm Sản Phẩm" && <AddProduct />}
        {isOpenFullScreenPanel.model === "Thêm Ảnh Quảng Cáo" && (
          <AddHomeSliderBanners />
        )}
        {isOpenFullScreenPanel.model === "Thêm Danh Mục Cha" && <AddCategory />}
        {isOpenFullScreenPanel.model === "Thêm Danh Mục Con" && (
          <AddSubCategory />
        )}
      </Dialog>

      <Toaster />
    </myContext.Provider>
  );
}

export default App;

export { myContext };
