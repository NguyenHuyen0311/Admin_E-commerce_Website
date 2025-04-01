import React, { useContext, useState, PureComponent } from "react";
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
  Select,
  MenuItem,
  Checkbox,
  Rating,
} from "@mui/material";
import TooltipMUI from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import Badge from "../../components/Badge";
import Button from "@mui/material/Button";
import { IoEye, IoPencil, IoSearch, IoTrash } from "react-icons/io5";
import { myContext } from "../../App";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryL1Fil, setCategoryL1Fil] = useState("");
  const [chart1Data, setChart1Data] = useState([
    {
      name: "Tháng 1",
      users: 4000,
      sales: 2400,
      amt: 2400,
    },
    {
      name: "Tháng 2",
      users: 3000,
      sales: 1398,
      amt: 2210,
    },
    {
      name: "Tháng 3",
      users: 2000,
      sales: 9800,
      amt: 2290,
    },
    {
      name: "Tháng 4",
      users: 2780,
      sales: 3908,
      amt: 2000,
    },
    {
      name: "Tháng 5",
      users: 1890,
      sales: 4800,
      amt: 2181,
    },
    {
      name: "Tháng 6",
      users: 2390,
      sales: 3800,
      amt: 2500,
    },
    {
      name: "Tháng 7",
      users: 3490,
      sales: 4600,
      amt: 2100,
    },
    {
      name: "Tháng 8",
      users: 3490,
      sales: 900,
      amt: 2100,
    },
    {
      name: "Tháng 9",
      users: 3490,
      sales: 2300,
      amt: 2100,
    },
    {
      name: "Tháng 10",
      users: 2490,
      sales: 1300,
      amt: 2100,
    },
    {
      name: "Tháng 11",
      users: 1490,
      sales: 400,
      amt: 2100,
    },
    {
      name: "Tháng 12",
      users: 6490,
      sales: 300,
      amt: 2100,
    },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);
  };

  const context = useContext(myContext);

  return (
    <>
      <div
        className={`content-wrap ${
          context.isSidebarOpen === true ? "w-[80%] ml-auto" : "w-[100%]"
        } transition-all py-4 px-5`}
      >
        <div className="w-full mt-[60px] p-5 border flex items-center justify-between mb-5 rounded-lg bg-[#ffe7e7]">
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

          <img src="/banner-welcome.webp" className="w-[250px]" />
        </div>

        <DashboardBoxes />

        <div className="card my-5 bg-[#fff] py-5 rounded-md shadow-md">
          <div className="w-full px-5 flex justify-between mb-3 items-center">
            <h2 className="text-[18px] font-bold">Sản phẩm</h2>
            <Button className="btn-primary">Thêm sản phẩm</Button>
          </div>

          <div className="w-full px-5 flex items-end justify-between gap-4 mb-6">
            <div className="flex flex-col w-[25%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục lớn
              </label>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoryL1Fil}
                onChange={handleChangeCategoryL1Fil}
                label="CategoryL1"
                size="small"
                className="rounded !h-[32px]"
              >
                <MenuItem value="">Không</MenuItem>
                <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
                <MenuItem value={20}>Đồ mặn</MenuItem>
                <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
              </Select>
            </div>
            <div className="flex flex-col w-[25%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục cấp 2
              </label>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoryL1Fil}
                onChange={handleChangeCategoryL1Fil}
                label="CategoryL1"
                size="small"
                className="rounded !h-[32px]"
              >
                <MenuItem value="">Không</MenuItem>
                <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
                <MenuItem value={20}>Đồ mặn</MenuItem>
                <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
              </Select>
            </div>
            <div className="flex flex-col w-[25%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục cấp 3
              </label>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoryL1Fil}
                onChange={handleChangeCategoryL1Fil}
                label="CategoryL1"
                size="small"
                className="rounded !h-[32px]"
              >
                <MenuItem value="">Không</MenuItem>
                <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
                <MenuItem value={20}>Đồ mặn</MenuItem>
                <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
              </Select>
            </div>
            <div className="searchBox h-[40px] w-[25%] bg-[#f2f2f2] rounded-[8px] relative">
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
            className="mt-4 shadow-sm"
            sx={{ maxHeight: 500, overflowY: "auto" }}
          >
            <Table stickyHeader sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Sản phẩm
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Danh mục
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Danh mục nhỏ
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Giá
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Giảm giá
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Số lượng
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Đánh giá
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <div className="flex items-center w-[350px] gap-3">
                      <img
                        src=""
                        alt="Sản phẩm"
                        className="!w-[65px] !h-[65px] object-cover !min-w-[65px] rounded-md"
                      />
                      <div className="info">
                        <h5 className="text-[14px] font-[600] line-clamp-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Sequi omnis placeat quas facere a eaque optio
                          corrupti voluptates. Eos laborum dignissimos
                          reiciendis ipsam quidem. Fuga, rem ipsum? Repudiandae,
                          libero magni?
                        </h5>
                        <p className="text-[12px] text-left mt-1 text-gray-500">
                          Navi
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    Đồ ăn nhẹ
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    Trà
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[14px] line-through font-[600] opacity-60">
                        50.000đ
                      </h4>
                      <h4 className="text-[15px] text-[#ff5252] font-[600]">
                        40.000đ
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    <b>1</b>
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    <h4 className="text-[#ff5252] text-[15px] font-[600]">
                      150
                    </h4>
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    <Rating name="read-only" value={4} size="small" readOnly />
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TooltipMUI title="Sửa">
                        <Button
                          style={{ minWidth: "35px" }}
                          className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                        >
                          <IoPencil className="text-black/60 !text-[20px]" />
                        </Button>
                      </TooltipMUI>
                      <TooltipMUI title="Xem">
                        <Button
                          style={{ minWidth: "35px" }}
                          className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                        >
                          <IoEye className="text-black/60 !text-[20px]" />
                        </Button>
                      </TooltipMUI>
                      <TooltipMUI title="Xóa">
                        <Button
                          style={{ minWidth: "35px" }}
                          className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                        >
                          <IoTrash className="text-black/60 !text-[20px]" />
                        </Button>
                      </TooltipMUI>
                    </div>
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

        <div className="card my-5 bg-[#fff] py-5 rounded-md shadow-md">
          <div className="w-full px-5 flex justify-between mb-6">
            <h2 className="text-[16px] font-[600] w-[70%]">Đơn hàng gần đây</h2>
            <div className="searchBox h-[40px] w-[30%] bg-[#f2f2f2] rounded-[8px] relative">
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

        <div className="card my-5 pr-3 w-full h-[400px] bg-[#fff] py-5 pb-20 rounded-md shadow-md">
          <h2 className="text-[16px] px-5 mb-3 font-[600] w-[70%]">Thống kê tổng tiền và người dùng</h2>

          <div className="flex items-center gap-3 px-5 mb-5">
            <span className="flex items-center gap-2 cursor-pointer"><span className="block w-[10px] h-[10px] rounded-full bg-green-600"></span>Tổng số người dùng</span>
            <span className="flex items-center gap-2 cursor-pointer"><span className="block w-[10px] h-[10px] rounded-full bg-blue-600"></span>Tổng số tiền</span>
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chart1Data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="none" strokeDasharray="3 3" />
              <XAxis tick={{ fontSize: 13 }} dataKey="name" />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 7 }}
              />
              <Line type="monotone" activeDot={{ r: 7 }} strokeWidth={2} dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
