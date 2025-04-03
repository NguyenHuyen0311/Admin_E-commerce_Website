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
import Dialog from "@mui/material/Dialog";;
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import AddProduct from "./pages/Products/addProduct";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: ''
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
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
  };

  return (
    <myContext.Provider value={values}>
      <RouterProvider router={router} />

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => setIsOpenFullScreenPanel({
          open: false
        })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',  backgroundColor: '#f1f1f1', color: 'rgba(0, 0, 0, 0.8)' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenFullScreenPanel({
                open: false
              })}
              aria-label="close"
            >
              <IoMdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isOpenFullScreenPanel.model}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setIsOpenFullScreenPanel({
                open: false
              })}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        
        {isOpenFullScreenPanel.model === "Thêm Sản Phẩm" && <AddProduct />}
      </Dialog>
    </myContext.Provider>
  );
}

export default App;

export { myContext };
