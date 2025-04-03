import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import TooltipMUI from "@mui/material/Tooltip";
import { IoSearch, IoTrash } from "react-icons/io5";
import { myContext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Users = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const context = useContext(myContext);

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
          <h2 className="text-[18px] font-bold">Danh sách người dùng</h2>
        </div>

        <div className="flex items-center w-full justify-end gap-3 px-3">
          <div className="flex items-center gap-3">
            <Button className="btn-border !h-[34px]">Xóa người dùng</Button>
          </div>
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
          className="mt-4 shadow-sm"
          sx={{ maxHeight: 500, overflowY: "auto" }}
        >
          <Table stickyHeader sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-[12px] uppercase !font-[700]">
                  Tên người dùng
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Số điện thoại
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Ngày tháng
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
                      src="https://www.onicifood.com/cdn/shop/files/BANHMIX3.png?v=1736931060&width=535"
                      alt="Sản phẩm"
                      className="!w-[65px] !h-[65px] object-cover !min-w-[65px] rounded-md"
                    />
                    <div className="info">
                      <h5 className="text-[14px] font-[600]">
                        Nguyễn Huyền
                      </h5>
                      <p className="text-[12px] flex items-center gap-1 text-left mt-1 text-gray-800">
                        <MdOutlineMarkEmailRead className="text-[16px]" /> huyenmeroria@gmail.com
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                  <p className="flex items-center gap-2"><FaPhoneAlt className="text-[14px] text-gray-700" /> 0966556026</p>
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                  <p className="flex items-center gap-2"><FaRegCalendarAlt className="text-[14px] text-gray-700" />03-4-2025</p>
                </TableCell>
                <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                  <div className="flex items-center justify-center gap-2">
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
    </section>
  );
};

export default Users;
