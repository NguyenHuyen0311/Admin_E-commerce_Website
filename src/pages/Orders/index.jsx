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
import { useEffect } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";

const Orders = () => {
  const context = useContext(myContext);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatusFil, setOrderStatusFil] = useState("");

  const handleChangeOrderStatusFil = (event, id) => {
    setOrderStatusFil(event.target.value);

    const obj = {
      id: id,
      order_status: event.target.value,
    }

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if(res?.data?.error === false) {
        context.openAlertBox("success", res?.data?.message);
      }
    })
  };

  const toggleExpand = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
      }
    });
  }, [orderStatusFil]);

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
                <TableCell></TableCell>
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
              {orders?.length !== 0 &&
                orders?.map((order, index) => {
                  return (
                    <>
                      <React.Fragment key={order._id}>
                        <TableRow>
                          <TableCell className="border text-center">
                            <Button className="!bg-[#f1f1f1] !w-[30px] !h-[30px] transition-all !min-w-[30px] !p-2 !rounded-full">
                              <FaAngleDown
                                className={`cursor-pointer text-black transition-transform ${
                                  expandedRows.includes(index)
                                    ? "rotate-180"
                                    : ""
                                }`}
                                onClick={() => toggleExpand(index)}
                              />
                            </Button>
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?._id}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.paymentId
                              ? order?.paymentId
                              : "Thanh toán khi nhận hàng"}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.delivery_address?.name}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.delivery_address?.mobile}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.delivery_address?.address_details}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.totalAmount?.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.userId?.email}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {order?.userId?._id}
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={order?.order_status !== null ? order?.order_status : orderStatusFil}
                              onChange={(e) => handleChangeOrderStatusFil(e, order?._id)}
                              label="Status"
                              size="small"
                              className="rounded !h-[32px] min-w-[120px]"
                            >
                              <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
                              <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>
                              <MenuItem value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</MenuItem>
                              <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                              <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell className="border whitespace-nowrap !text-center">
                            {new Date(order?.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={8} className="p-0">
                            <Collapse in={expandedRows.includes(index)}>
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
                                  {order?.products?.map((item, index) => {
                                    return (
                                      <TableRow key={index}>
                                        <TableCell className="border !text-center">
                                          {item?.productId}
                                        </TableCell>
                                        <TableCell className="border text-center">
                                          <div className="flex justify-center">
                                            <img
                                              src={item?.image}
                                              alt={item?.productTitle}
                                              className="w-10 h-10 rounded"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell className="border !text-center">
                                          {item?.productTitle}
                                        </TableCell>
                                        <TableCell className="border !text-center">
                                          {item?.quantity}
                                        </TableCell>
                                        <TableCell className="border !text-center">
                                          {item?.price?.toLocaleString("vi-VN")}
                                          đ
                                        </TableCell>
                                        <TableCell className="border !text-center">
                                          {item?.subTotal?.toLocaleString(
                                            "vi-VN"
                                          )}
                                          đ
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    </>
                  );
                })}
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
