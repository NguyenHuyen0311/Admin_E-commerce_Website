import React, { useState } from "react";
import DashboardBoxes from "../../components/DashboardBoxes";
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";
import Badge from "../../components/Badge";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="w-full p-5 border flex items-center justify-between mb-5 rounded-lg bg-[#fde6e6]">
        <div className="info">
          <h1 className="text-[35px] leading-11 font-[700]">
            Xin chào, <br />
            <span className="font-[800] text-[#ff5252]">Nguyễn Huyền</span>
          </h1>
          <p className="text-[16px] font-[400] mt-2">
            Dưới đây là tình hình cửa hàng của bạn hôm nay! Xem ngay thống kê
            chi tiết.
          </p>
          <Button className="btn-primary transition-all !mt-5 flex gap-1 !items-center">
            <FaPlus className="text-[20px]" />
            <span>Thêm sản phẩm</span>
          </Button>
        </div>

        <img src="../../../public/banner-welcome.webp" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card my-5 bg-[#fff] py-5 rounded-md shadow-md">
        <div className="w-full px-5 flex justify-between mb-6">
          <h2 className="text-[14px] font-[600] w-[50%]">Đơn hàng gần đây</h2>
          <div className="searchBox h-[40px] w-[50%] bg-[#f2f2f2] rounded-[8px] relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full !h-[36px] pl-[15px] pr-[35px] bg-[#f2f2f2] rounded-[5px] focus:outline-none text-[14px] placeholder:text-[12px]"
            />
            <Button className="btn-primary transition-all !absolute top-[0] right-[0] !h-[39px] w-[36px] flex items-center justify-center">
              <IoSearch className="text-white size-4" />
            </Button>
          </div>
        </div>

        <TableContainer
          component={Paper}
          className="mt-4 shadow-md"
          sx={{ maxHeight: 500, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]"></TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Mã đơn hàng
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Mã thanh toán
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Họ và tên
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Số điện thoại
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Địa chỉ nhận hàng
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Tổng tiền
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Email
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Mã người dùng
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Trạng thái đơn hàng
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Ngày đặt hàng
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell className="border text-center">
                  <Button className="!bg-[#f1f1f1] !w-[30px] !h-[30px] transition-all !min-w-[30px] !p-2 !rounded-full">
                    <FaAngleDown
                      className={`cursor-pointer text-black transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                      onClick={toggleExpand}
                    />
                  </Button>
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  #12345
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  PAY-67890
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  Nguyễn Văn A
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  0123456789
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  <div className="address-user flex flex-col items-start gap-2">
                    <span className="bg-[#f1f1f1] text-black/70 text-xs px-2 py-1 rounded">
                      Home
                    </span>
                    <h5>123 Đường ABC</h5>
                  </div>
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  1,500,000đ
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  a@gmail.com
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  U-001
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  <Badge status="Đã giao hàng" />
                </TableCell>
                <TableCell className="border whitespace-nowrap !text-center">
                  27-3-2025
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={8} className="p-0">
                  <Collapse in={expanded}>
                    <Table className="w-full">
                      <TableHead className="bg-gray-50">
                        <TableRow>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Mã sản phẩm
                          </TableCell>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Ảnh
                          </TableCell>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Tên sản phẩm
                          </TableCell>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Số lượng
                          </TableCell>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Đơn giá
                          </TableCell>
                          <TableCell className="border !text-center text-[12px] uppercase font-[700]">
                            Tạm tính
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell className="border !text-center">
                            P001
                          </TableCell>
                          <TableCell className="border text-center">
                            <div className="flex justify-center">
                              <img
                                src=""
                                alt="Xiên bẩn"
                                className="w-10 h-10 rounded"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="border !text-center">
                            Xiên bẩn
                          </TableCell>
                          <TableCell className="border !text-center">
                            1
                          </TableCell>
                          <TableCell className="border !text-center">
                            15,000,000đ
                          </TableCell>
                          <TableCell className="border !text-center">
                            15,000,000đ
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="border !text-center">
                            P002
                          </TableCell>
                          <TableCell className="border text-center">
                            <div className="flex justify-center">
                              <img
                                src=""
                                alt="Nem rán"
                                className="w-10 h-10 rounded"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="border !text-center">
                            Nem rán
                          </TableCell>
                          <TableCell className="border !text-center">
                            2
                          </TableCell>
                          <TableCell className="border !text-center">
                            500,000đ
                          </TableCell>
                          <TableCell className="border !text-center">
                            1,000,000đ
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Dashboard;
