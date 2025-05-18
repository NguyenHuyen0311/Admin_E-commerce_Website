import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoMdNotificationsOutline } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { myContext } from "../../App";
import { Link, useNavigate } from "react-router";
import { fetchDataFromApi } from "../../utils/api";
import AddProduct from "../../pages/Products/addProduct";
import AddHomeSliderBanners from "../../pages/HomeSliderBanners/addHomeSliderBanners";
import AddCategory from "../../pages/Categories/addCategory";
import AddSubCategory from "../../pages/Categories/addSubCategory";
import EditCategory from "../../pages/Categories/editCategory";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import EditProduct from "../../pages/Products/editProduct";
import AddBlog from "../../pages/Blog/addBlog";
import EditBlog from "../../pages/Blog/editBlog";
import EditHomeSliderBanners from "../../pages/HomeSliderBanners/editHomeSliderBanners";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAccountAdmin, setAnchorMyAccountAdmin] = useState(null);
  const openMyAccountAdmin = Boolean(anchorMyAccountAdmin);
  const handleClickMyAccountAdmin = (event) => {
    setAnchorMyAccountAdmin(event.currentTarget);
  };
  const handleCloseMyAccountAdmin = () => {
    setAnchorMyAccountAdmin(null);
  };

  const context = useContext(myContext);
  const history = useNavigate();

  const logout = () => {
    setAnchorMyAccountAdmin(null);

    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");

        history("/login");
      }
    });
  };

  return (
    <>
      <header
        className={`h-auto fixed top-0 right-0 z-[999] py-2 w-full shadow-md pr-10 bg-[#fff] flex items-center justify-between ${
          context.isSidebarOpen === true ? "pl-[20%]" : "pl-0]"
        }`}
      >
        <div className="part1 pl-8 w-[40%]">
          <Button
            onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
            className="!w-[40px] !h-[40px] !rounded-full !text-black/90 !min-w-[40px]"
          >
            <IoIosMenu className="!text-[22px]" />
          </Button>
        </div>

        <div className="part2 gap-5 flex items-center justify-end w-[40%]">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <IoMdNotificationsOutline className="text-black/70 text-[25px]" />
            </StyledBadge>
          </IconButton>

          {context.isLogin === true ? (
            <>
              <div className="relative">
                <div
                  onClick={handleClickMyAccountAdmin}
                  className="!rounded-full overflow-hidden cursor-pointer !w-[35px] !h-[35px] !min-w-[35px]"
                >
                  {context?.userData?.avatar === "" ? (
                          <img
                            src="/user-avatar-default.png"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={context?.userData?.avatar}
                            className="w-full h-full object-cover"
                            style={{
                              imageRendering: "auto",
                              backfaceVisibility: "hidden",
                              transform: "translate3d(0,0,0)",
                            }}
                          />
                        )}
                </div>

                <Menu
                  anchorEl={anchorMyAccountAdmin}
                  id="account-menu"
                  open={openMyAccountAdmin}
                  onClose={handleCloseMyAccountAdmin}
                  onClick={handleCloseMyAccountAdmin}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccountAdmin}>
                    <div className="flex items-center gap-3">
                      <div className="!rounded-full overflow-hidden cursor-pointer w-[35px] h-[35px] !min-w-[35px]">
                        {context?.userData?.avatar === "" ? (
                          <img
                            src="/user-avatar-default.png"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={context?.userData?.avatar}
                            className="w-full h-full object-cover"
                            style={{
                              imageRendering: "auto",
                              backfaceVisibility: "hidden",
                              transform: "translate3d(0,0,0)",
                            }}
                          />
                        )}
                      </div>

                      <div className="info">
                        {context?.userData && (
                          <>
                            <h3 className="text-[14px] text-black/80 font-[600]">
                              {context?.userData?.name}
                            </h3>
                            <p className="text-[13px] font-[400] text-black/80">
                              {context?.userData?.email}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </MenuItem>
                  <Divider />
                  <Link to="/profile">
                    <MenuItem
                      onClick={handleCloseMyAccountAdmin}
                      className="!flex items-center gap-2"
                    >
                      <FaRegUser className="text-[15px] text-black/70" />
                      <span className="text-[14px] font-[500]">Tài khoản</span>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={logout}
                    className="!flex items-center gap-2"
                  >
                    <IoIosLogOut className="text-[17px]" />
                    <span className="text-[14px] font-[500]">Đăng xuất</span>
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="btn-primary !h-[33px] !rounded-full">
                  Đăng nhập
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanel.open}
        onClose={() =>
          context?.setIsOpenFullScreenPanel({
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
                context?.setIsOpenFullScreenPanel({
                  open: false,
                })
              }
              aria-label="close"
            >
              <IoMdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {context?.isOpenFullScreenPanel.model}
            </Typography>
          </Toolbar>
        </AppBar>
        {context?.isOpenFullScreenPanel.model === "Thêm Sản Phẩm" && (
          <AddProduct />
        )}
        {context?.isOpenFullScreenPanel.model === "Thêm Ảnh Quảng Cáo" && (
          <AddHomeSliderBanners />
        )}
        {context?.isOpenFullScreenPanel.model === "Sửa Ảnh Quảng Cáo" && (
          <EditHomeSliderBanners />
        )}
        {context?.isOpenFullScreenPanel.model === "Thêm Danh Mục Cha" && (
          <AddCategory />
        )}
        {context?.isOpenFullScreenPanel.model === "Thêm Danh Mục Con" && (
          <AddSubCategory />
        )}
        {context?.isOpenFullScreenPanel.model === "Sửa Danh Mục Cha" && (
          <EditCategory />
        )}
        {context?.isOpenFullScreenPanel.model === "Sửa Sản Phẩm" && (
          <EditProduct />
        )}
        {context?.isOpenFullScreenPanel.model === "Thêm Bài Viết" && (
          <AddBlog />
        )}
        {context?.isOpenFullScreenPanel.model === "Sửa Bài Viết" && (
          <EditBlog />
        )}
      </Dialog>
    </>
  );
};

export default Header;
