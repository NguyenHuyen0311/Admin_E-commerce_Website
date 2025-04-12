import React, { useContext, useEffect, useState } from "react";
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
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Products = () => {
  const [categoryL1Fil, setCategoryL1Fil] = useState("");
  const [categoryL2Fil, setCategoryL2Fil] = useState("");
  const [categoryL3Fil, setCategoryL3Fil] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [productData, setProductData] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const getProducts = () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);

    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    })
  };

  const handleChangeCategoryL2Fil = (event) => {
    setCategoryL2Fil(event.target.value);

    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    })
  };

  const handleChangeCategoryL3Fil = (event) => {
    setCategoryL3Fil(event.target.value);

    fetchDataFromApi(`/api/product/getAllProductsByThirdCatId/${event.target.value}`).then((res) => {
      console.log(res);
      
      if (res?.error === false) {
        setProductData(res?.products);
      }
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.openAlertBox("success", "Xóa sản phẩm thành công!");
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
          <h2 className="text-[18px] font-bold">Danh sách sản phẩm</h2>
          <div className="flex items-center gap-3">
            <Button className="btn-border !h-[34px]">Xóa sản phẩm</Button>
            <Button
              className="btn-primary"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Sản Phẩm",
                })
              }
            >
              Thêm Sản Phẩm
            </Button>
          </div>
        </div>

        <div className="w-full mt-4 px-5 flex items-end justify-between gap-4 mb-6">
          <div className="flex flex-col w-[25%] gap-2">
            <label className="text-[14px] font-[600]">Theo danh mục lớn</label>

            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={categoryL1Fil}
                label="categoryL1Fil"
                onChange={handleChangeCategoryL1Fil}
                size="small"
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={cat?._id}
                    >
                      {cat?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-col w-[25%] gap-2">
            <label className="text-[14px] font-[600]">
              Theo danh mục cấp 2
            </label>
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={categoryL2Fil}
                label="categoryL2Fil"
                onChange={handleChangeCategoryL2Fil}
                size="small"
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, index_) => {
                      return (
                        <MenuItem
                          key={index_}
                          value={subCat?._id}
                        >
                          {subCat?.name}
                        </MenuItem>
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-col w-[25%] gap-2">
            <label className="text-[14px] font-[600]">
              Theo danh mục cấp 3
            </label>
            {context?.catData?.length !== 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={categoryL3Fil}
                label="categoryL3Fil"
                onChange={handleChangeCategoryL3Fil}
                size="small"
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdSubCat, index__) => {
                          return (
                            <MenuItem
                              key={index__}
                              value={thirdSubCat?._id}
                            >
                              {thirdSubCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
              </Select>
            )}
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
                  Danh mục con
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
              {productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                          <Checkbox {...label} size="small" />
                        </TableCell>
                        <TableCell className="border border-gray-300">
                          <div className="flex items-center w-[100%] !whitespace-nowrap gap-3">
                            <Link
                              to={`/product/${product?._id}`}
                              data-discover="true"
                            >
                              <LazyLoadImage
                                className="!w-[65px] !h-[65px] object-cover !min-w-[65px] rounded-md"
                                alt={"image"}
                                name="images"
                                effect="blur"
                                wrapperProps={{
                                  style: { transitionDelay: "1s" },
                                }}
                                src={product?.images[0]}
                              />
                            </Link>
                            <div className="info">
                              <h5 className="text-[14px] font-[600] line-clamp-2">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h5>
                              <p className="text-[12px] text-left mt-1 text-gray-500">
                                {product?.brand}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          {product?.catName}
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          {product?.subCatName}
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          <div className="flex flex-col gap-1">
                            <h4 className="text-[14px] line-through font-[600] opacity-60">
                              {product?.oldPrice?.toLocaleString("vi-VN")}đ
                            </h4>
                            <h4 className="text-[15px] text-[#ff5252] font-[600]">
                              {product?.price?.toLocaleString("vi-VN")}đ
                            </h4>
                          </div>
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          <b>{product?.discount}</b>
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          <h4 className="text-[#ff5252] text-[15px] font-[600]">
                            {product?.countInStock}
                          </h4>
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          <Rating
                            name="read-only"
                            value={product?.rating}
                            size="small"
                            readOnly
                          />
                        </TableCell>
                        <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                          <div className="flex items-center justify-center gap-2">
                            <TooltipMUI title="Sửa">
                              <Button
                                onClick={() =>
                                  context?.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Sửa Sản Phẩm",
                                    id: product?._id,
                                  })
                                }
                                style={{ minWidth: "35px" }}
                                className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                              >
                                <IoPencil className="text-black/60 !text-[20px]" />
                              </Button>
                            </TooltipMUI>
                            <TooltipMUI title="Xem">
                              <Link to={`/product/${product?._id}`}>
                                <Button
                                  style={{ minWidth: "35px" }}
                                  className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                                >
                                  <IoEye className="text-black/60 !text-[20px]" />
                                </Button>
                              </Link>
                            </TooltipMUI>
                            <TooltipMUI title="Xóa">
                              <Button
                                onClick={() => deleteProduct(product?._id)}
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
          <Pagination count={10} />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productData?.length}
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
