import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  Rating,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import TooltipMUI from "@mui/material/Tooltip";
import { IoEye, IoPencil, IoSearch, IoTrash } from "react-icons/io5";
import { myContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Products = () => {
    const [categoryL1Fil, setCategoryL1Fil] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const context = useContext(myContext);
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <section className={`mt-[50px] transition-all ${context.isSidebarOpen === true ? 'max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]' : 'w-full px-10'}`}>
      <div className="card mt-10 my-5 bg-[#fff] py-5 rounded-md shadow-md">
        <div className="w-full px-5 flex justify-between mb-3 items-center">
          <h2 className="text-[18px] font-bold">Danh sách sản phẩm</h2>
          <div className="flex items-center gap-3">
            <Button className="btn-border !h-[34px]">Xóa sản phẩm</Button>
            <Button className="btn-primary" onClick={() => context.setIsOpenFullScreenPanel({
                open: true,
                model: 'Thêm Sản Phẩm' 
            })}>Thêm Sản Phẩm</Button>
          </div>
        </div>

        <div className="w-full mt-4 px-5 flex items-end justify-between gap-4 mb-6">
          <div className="flex flex-col w-[25%] gap-2">
            <label className="text-[14px] font-[600]">Theo danh mục lớn</label>

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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sequi omnis placeat quas facere a eaque optio corrupti
                        voluptates. Eos laborum dignissimos reiciendis ipsam
                        quidem. Fuga, rem ipsum? Repudiandae, libero magni?
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
                  <h4 className="text-[#ff5252] text-[15px] font-[600]">150</h4>
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
    </section>
  );
};

export default Products;
