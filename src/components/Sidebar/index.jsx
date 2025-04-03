import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImages } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";
import { RiEdgeNewFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { TbUsersGroup } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { myContext } from "../../App";

const Sidebar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);

  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
      return;
    } else {
      setSubMenuIndex(index);
    }
  };

  const context = useContext(myContext);

  return (
    <div
      className={`sidebar z-[999] px-4 fixed top-0 left-0 bg-[#fff] border-r h-full  ${
        context.isSidebarOpen === true ? "w-[20%]" : "!hidden"
      } transition-all`}
    >
      <div className="logo w-full flex justify-start ">
        <Link to="/">
          <img
            className="w-full h-[70px] py-2 object-contain rounded-lg"
            src="/logo.png"
          />
        </Link>
      </div>

      <ul className="list-none flex flex-col">
        <li>
          <Link to="/">
            <Button className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start">
              <RxDashboard className="!text-[20px]" />
              <span className="!text-[14px]">Tổng quan</span>
            </Button>
          </Link>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(1)}
            className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start"
          >
            <FaRegImages className="!text-[20px]" />
            <span className="!text-[14px]">Ảnh quảng cáo</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`!text-[16px] ml-auto transition-all ${
                  subMenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          <Collapse
            isOpened={subMenuIndex === 1 ? true : false}
            className="w-full"
          >
            <ul className="w-full">
              <li className="w-full">
                <Link to="/banners">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Danh sách ảnh quảng cáo
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Thêm Ảnh Quảng Cáo",
                    })
                  }
                  className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case "
                >
                  <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                  Thêm ảnh quảng cáo
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(2)}
            className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start"
          >
            <MdOutlineCategory className="!text-[20px]" />
            <span className="!text-[14px]">Danh mục</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`!text-[16px] ml-auto transition-all ${
                  subMenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          <Collapse
            isOpened={subMenuIndex === 2 ? true : false}
            className="w-full"
          >
            <ul className="w-full">
              <li className="w-full">
                <Link to="/categories">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Danh sách danh mục cha
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                  <Button onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Danh Mục Cha",
                })
              } className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Thêm danh mục cha
                  </Button>
              </li>
              <li className="w-full">
                <Link to="/sub-category">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Danh sách danh mục con
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                  <Button onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Danh Mục Con",
                })
              } className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Thêm danh mục con
                  </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(3)}
            className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start"
          >
            <TbBrandProducthunt className="!text-[20px]" />
            <span className="!text-[14px]">Sản phẩm</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`!text-[16px] ml-auto transition-all ${
                  subMenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          <Collapse
            isOpened={subMenuIndex === 3 ? true : false}
            className="w-full"
          >
            <ul className="w-full">
              <li className="w-full">
                <Link to="/products">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Danh sách sản phẩm
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Thêm Sản Phẩm",
                    })
                  }
                  className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case "
                >
                  <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                  Thêm sản phẩm
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/users">
            <Button className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start">
              <TbUsersGroup className="!text-[20px]" />
              <span className="!text-[14px]">Người dùng</span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <Button className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start">
              <IoBagCheckOutline className="!text-[20px]" />
              <span className="!text-[14px]">Đơn hàng</span>
            </Button>
          </Link>
        </li>

        <li>
          <Button
            onClick={() => isOpenSubMenu(4)}
            className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start"
          >
            <CiViewTimeline className="!text-[20px]" />
            <span className="!text-[14px]">Bài viết</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`!text-[16px] ml-auto transition-all ${
                  subMenuIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </span>
          </Button>

          <Collapse
            isOpened={subMenuIndex === 4 ? true : false}
            className="w-full"
          >
            <ul className="w-full">
              <li className="w-full">
                <Link to="/blogs">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Danh sách bài viết
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/blog/add">
                  <Button className="!text-black/70 flex gap-2 !justify-start !w-full !text-[13px] !font-[550] !normal-case ">
                    <span className="block w-[5px] h-[5px] !min-w-[5px] rounded-full bg-black/30"></span>
                    Thêm bài viết
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/logo">
            <Button className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start">
              <RiEdgeNewFill className="!text-[20px]" />
              <span className="!text-[14px]">Logo</span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/logout">
            <Button className="w-full !py-2 !capitalize hover:bg-[#f1f1f1] !font-[600] flex !items-center gap-3 !text-black/70 !justify-start">
              <IoMdLogOut className="!text-[20px]" />
              <span className="!text-[14px]">Đăng xuất</span>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
