import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import { IoSearch } from "react-icons/io5";
import { myContext } from "../../App";
import { FaAngleDown } from "react-icons/fa";

const Orders = () => {
  const context = useContext(myContext);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [orderStatusFil, setOrderStatusFil] = useState("");

  const handleChangeOrderStatusFil = (event) => {
    setOrderStatusFil(event.target.value);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <section
      className={`mt-[50px] transition-all ${
        context.isSidebarOpen === true
          ? "max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]"
          : "w-full px-10"
      }`}
    >
      <div className="card mt-10 my-5 bg-[#fff] py-5 rounded-md shadow-md">
        <div className="w-full pl-5 flex mb-3 items-center">
          <h2 className="text-[18px] font-bold">Danh sách đơn hàng</h2>
        </div>

        <div className="flex items-center w-full justify-end gap-3 px-3">
          <div className="searchBox h-[40px] w-[35%] bg-[#f2f2f2] rounded-[8px] relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full !h-[36px] pl-[15px] pr-[35px] bg-[#f2f2f2] rounded-[5px] focus:outline-none text-[14px] placeholder:text-[12px]"
            />
            <Button className="btn-primary transition-all !absolute top-[0] right-[0] !h-[39px] !w-[16px] flex items-center justify-center">
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
                  <Button
                    onClick={toggleExpand}
                    className="!bg-[#f1f1f1] !w-[30px] !h-[30px] transition-all !min-w-[30px] !p-2 !rounded-full"
                  >
                    <FaAngleDown
                      className={`cursor-pointer text-black transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
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
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={orderStatusFil}
                    onChange={handleChangeOrderStatusFil}
                    label="CategoryL1"
                    size="small"
                    className="rounded !h-[32px] min-w-[120px]"
                  >
                    <MenuItem value="">Không</MenuItem>
                    <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
                    <MenuItem value={20}>Đồ mặn</MenuItem>
                    <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
                  </Select>
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
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full flex items-center justify-end px-5 mt-5">
          <Pagination count={10} />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Orders;
