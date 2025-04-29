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
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TooltipMUI from "@mui/material/Tooltip";
import { IoPencil, IoTrash } from "react-icons/io5";
import { myContext } from "../../App";
import {
  deleteData,
  fetchDataFromApi,
} from "../../utils/api";
import { useEffect } from "react";

const HomeSliderBanners = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [slidesData, setSlidesData] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi("/api/homeSlider").then((res) => {
      setSlidesData(res?.data);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlider/${id}`).then((res) => {
      context.openAlertBox("success", "Xóa ảnh quảng cáo thành công!");
      getData();
    });
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
        <div className="w-full px-5 flex justify-between mb-3 items-center">
          <h2 className="text-[18px] font-bold">Danh sách ảnh quảng cáo</h2>
          <div className="flex items-center gap-3">
            <Button
              className="btn-primary"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Ảnh Quảng Cáo",
                })
              }
            >
              Thêm Ảnh Quảng Cáo
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
                  Hình ảnh
                </TableCell>

                <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slidesData?.length !== 0 &&
                slidesData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300 !text-center w-[70%]">
                        <div className="flex justify-center items-center">
                          <img
                            src={item?.images[0]}
                            alt="Sản phẩm"
                            className="w-[350px] h-[100px] object-cover rounded-md cursor-pointer"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="border border-gray-300 whitespace-nowrap !text-center w-[30%]">
                        <div className="flex items-center justify-center gap-2">
                          <TooltipMUI title="Sửa">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Sửa Ảnh Quảng Cáo",
                                  id: item?._id,
                                })
                              }
                              style={{ minWidth: "35px" }}
                              className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                            >
                              <IoPencil className="text-black/60 !text-[20px]" />
                            </Button>
                          </TooltipMUI>
                          <TooltipMUI title="Xóa">
                            <Button
                              onClick={() => deleteSlide(item?._id)}
                              style={{ minWidth: "35px" }}
                              className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                            >
                              <IoTrash className="text-black/60 !text-[20px]" />
                            </Button>
                          </TooltipMUI>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full flex items-center justify-end px-5 mt-5">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={slidesData?.length}
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

export default HomeSliderBanners;
