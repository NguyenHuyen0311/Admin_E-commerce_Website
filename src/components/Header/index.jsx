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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = (toggleSidebar) => {
  const [anchorMyAccountAdmin, setAnchorMyAccountAdmin] = useState(null);
  const openMyAccountAdmin = Boolean(anchorMyAccountAdmin);
  const handleClickMyAccountAdmin = (event) => {
    setAnchorMyAccountAdmin(event.currentTarget);
  };
  const handleCloseMyAccountAdmin = () => {
    setAnchorMyAccountAdmin(null);
  };

  const context = useContext(myContext);

  return (
    <header className={`h-auto fixed top-0 right-0 z-[999] py-2 w-full shadow-md pr-10 bg-[#fff] flex items-center justify-between ${context.isSidebarOpen === true ? 'pl-[20%]' : 'pl-0]'}`}>
      <div className="part1 pl-8 w-[40%]">
        <Button onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)} className="!w-[40px] !h-[40px] !rounded-full !text-black/90 !min-w-[40px]">
          <IoIosMenu className="!text-[22px]" />
        </Button>
      </div>

      <div className="part2 gap-5 flex items-center justify-end w-[40%]">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <IoMdNotificationsOutline className="text-black/70 text-[25px]" />
          </StyledBadge>
        </IconButton>

        <div className="relative">
          <div
            onClick={handleClickMyAccountAdmin}
            className="!rounded-full overflow-hidden cursor-pointer w-[30px] h-[30px]"
          >
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocLzyJsxtulB4lUiFk0nxv23s3JYNVuNbuy4cwNnREIZ=s96-c"
              className="w-full h-full object-cover"
            />
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
                <div className="!rounded-full overflow-hidden cursor-pointer w-[30px] h-[30px]">
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocLzyJsxtulB4lUiFk0nxv23s3JYNVuNbuy4cwNnREIZ=s96-c"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="info">
                  <h3 className="text-[14px] text-black/80 font-[600]">
                    Huyền Nguyễn
                  </h3>
                  <p className="text-[13px] font-[400] text-black/80">
                    huyenmeroria@gmail.com
                  </p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleCloseMyAccountAdmin}
              className="!flex items-center gap-2"
            >
              <FaRegUser className="text-[15px] text-black/70" />
              <span className="text-[14px] font-[500]">Tài khoản</span>
            </MenuItem>
            <MenuItem
                      onClick={handleCloseMyAccountAdmin}
                      className="!flex items-center gap-2"
                    >
                      <IoIosLogOut className="text-[17px]" />
                      <span className="text-[14px] font-[500]">Đăng xuất</span>
                    </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
