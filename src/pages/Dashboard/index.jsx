import React, { useContext, useEffect, useState } from "react";
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
  Bar,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
import { Link } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SearchBox from "../../components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [categoryL1Fil, setCategoryL1Fil] = useState("");
  const [categoryL2Fil, setCategoryL2Fil] = useState("");
  const [categoryL3Fil, setCategoryL3Fil] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [pageOrder, setPageOrder] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ordersData, setOrdersData] = useState([]);
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const [totalProductData, setTotalProductData] = useState([]);
  const [searchQueryProduct, setSearchQueryProduct] = useState("");
  
  const context = useContext(myContext);

  const toggleExpand = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&perPage=5`).then(
      (res) => {
        if (res?.error === false) {
          setOrdersData(res?.data);
          setTotalPages(res?.totalPages);
        }
      }
    );

    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
      }
    });
  }, [pageOrder]);

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredOrders = totalOrdersData?.data?.filter(
        (order) =>
          order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order?.userId?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.delivery_address?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.userId?.mobile
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.delivery_address?.mobile
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.delivery_address?.address_details
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.userId?.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.createdAt.includes(searchQuery)
      );
      setOrdersData(filteredOrders);
    } else {
      fetchDataFromApi(
        `/api/order/order-list?page=${pageOrder}&perPage=5`
      ).then((res) => {
        if (res?.error === false) {
          setOrdersData(res?.data);
        }
      });
    }
  }, [searchQuery, pageOrder]);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const getProducts = () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setProductData(productArr);
      }
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    // Update the sorted IDs state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) => {
      if (item._id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setProductData(updatedItems);

    // Update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);
    setCategoryL2Fil("");
    setCategoryL3Fil("");

    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeCategoryL2Fil = (event) => {
    setCategoryL2Fil(event.target.value);
    setCategoryL1Fil("");
    setCategoryL3Fil("");

    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
  };

  const handleChangeCategoryL3Fil = (event) => {
    setCategoryL3Fil(event.target.value);
    setCategoryL1Fil("");
    setCategoryL2Fil("");

    fetchDataFromApi(
      `/api/product/getAllProductsByThirdCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
      }
    });
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

  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context.openAlertBox("error", "Vui lòng chọn sản phẩm muốn xóa!");
      return;
    }

    try {
      deleteMultipleData(`/api/product/deleteMultipleProducts`, {
        ids: sortedIds,
      }).then((res) => {
        console.log(res);
        getProducts();
        context.openAlertBox("success", "Xóa sản phẩm thành công!");
      });
    } catch (error) {
      context.openAlertBox("error", "Xóa sản phẩm thất bại!");
    }
  };

  useEffect(() => {
    getTotalSalesByYear();

    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false) {
        setUsers(res?.users);
      }
    });

    fetchDataFromApi("/api/user/getAllReviews").then((res) => {
      if (res?.error === false) {
        setAllReviews(res?.reviews);
      }
    });
  }, []);

  const getTotalUsersByYear = () => {
    fetchDataFromApi("/api/order/users").then((res) => {
      const users = [];
      res?.TotalUsers?.length !== 0 &&
        res?.TotalUsers?.map((item) => {
          users.push({
            name: item?.name,
            TotalUsers: parseInt(item?.TotalUsers),
          });
        });

      const uniqueArr = users.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };

  const getTotalSalesByYear = () => {
    fetchDataFromApi("/api/order/sales").then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
        res?.monthlySales?.map((item) => {
          sales.push({
            name: item?.name,
            TotalSales: parseInt(item?.TotalSales),
          });
        });

      const uniqueArr = sales.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };

  useEffect(() => {
      fetchDataFromApi(`/api/product/getAllProducts?page=1&perPage=10`).then(
        (res) => {
          setProductData(res?.products);
          setTotalProductData(res?.products);
        }
      );
    }, []);
  
    useEffect(() => {
      if (searchQueryProduct !== "") {
        const filteredItems = totalProductData?.filter(
          (product) =>
            product?._id?.toLowerCase().includes(searchQueryProduct.toLowerCase()) ||
            product?.brand.toLowerCase().includes(searchQueryProduct.toLowerCase()) ||
            product?.name.toLowerCase().includes(searchQueryProduct.toLowerCase()) ||
            product?.catName.toLowerCase().includes(searchQueryProduct.toLowerCase()) ||
            product?.subCatName
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase()) ||
            product?.thirdSubCatName
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase()) ||
            product?.price
              .toString()
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase()) ||
            product?.oldPrice
              .toString()
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase()) ||
            product?.discount
              .toString()
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase()) ||
            product?.rating
              .toString()
              .toLowerCase()
              .includes(searchQueryProduct.toLowerCase())
        );
        setProductData(filteredItems);
      } else {
        fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
          if (res?.error === false) {
            setProductData(res?.products);
          }
        });
      }
    }, [searchQueryProduct]);

  return (
    <>
      <div
        className={`content-wrap bg-[#f1f1f1] ${
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
            <Button
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Sản Phẩm",
                })
              }
              className="btn-primary transition-all !mt-5 flex gap-1 !items-center"
            >
              <FaPlus className="text-[20px]" />
              <span>Thêm sản phẩm</span>
            </Button>
          </div>

          <img src="/banner-welcome.webp" className="w-[250px]" />
        </div>

        {productData?.length !== 0 &&
          users?.length !== 0 &&
          allReviews?.length !== 0 && (
            <DashboardBoxes
              orders={totalOrdersData?.data?.length}
              products={productData?.length}
              users={users?.length}
              category={context?.catData?.length}
              reviews={allReviews?.length}
            />
          )}

        <div className="card my-5 bg-[#fff] py-5 rounded-md shadow-md">
          <div className="w-full px-5 flex justify-between mb-3 items-center">
            <h2 className="text-[18px] font-bold">Danh sách sản phẩm</h2>
            <div className="flex items-center gap-3">
              <Button
                onClick={deleteMultipleProduct}
                variant="contained"
                className="btn-border !shadow-none !h-[34px]"
              >
                Xóa
              </Button>
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
            <div className="flex flex-col w-[22%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục lớn
              </label>

              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="categoryL1"
                  value={categoryL1Fil}
                  label="categoryL1Fil"
                  onChange={handleChangeCategoryL1Fil}
                  size="small"
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem key={index} value={cat?._id}>
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
            <div className="flex flex-col w-[22%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục cấp 2
              </label>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="categoryL2"
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
                          <MenuItem key={index_} value={subCat?._id}>
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>
            <div className="flex flex-col w-[22%] gap-2">
              <label className="text-[14px] font-[600]">
                Theo danh mục cấp 3
              </label>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="categoryL3"
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
                              <MenuItem key={index__} value={thirdSubCat?._id}>
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
            <div className="searchBox h-[40px] w-[34%] bg-[#f2f2f2] rounded-[8px] relative">
              <SearchBox
                searchQuery={searchQueryProduct}
                setSearchQuery={setSearchQueryProduct}
              />
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
                    <Checkbox
                      {...label}
                      size="small"
                      checked={
                        productData?.length > 0
                          ? productData.every((item) => item.checked)
                          : false
                      }
                      onChange={handleSelectAll}
                    />
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
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((product, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                            <Checkbox
                              {...label}
                              size="small"
                              checked={product?.checked === true ? true : false}
                              onChange={(e) =>
                                handleCheckboxChange(e, product?._id, index)
                              }
                            />
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

        <div className="card my-5 bg-[#fff] py-5 rounded-md shadow-md">
          <div className="flex items-center w-full px-5">
            <div className="w-full pl-5">
              <h2 className="text-[18px] font-bold">Đơn hàng gần đây</h2>
            </div>

            <div className="searchBox w-[45%] bg-[#f2f2f2] rounded-[8px] relative">
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setPageOrder={setPageOrder}
              />
            </div>
          </div>

          <TableContainer component={Paper} className="mt-4 shadow-md">
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
                {ordersData?.length !== 0 &&
                  ordersData?.map((order, index) => {
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
                              {order?.delivery_address?.name ||
                                order?.userId?.name}
                            </TableCell>
                            <TableCell className="border whitespace-nowrap !text-center">
                              {order?.delivery_address?.mobile ||
                                order?.userId?.mobile}
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
                              <Badge status={order?.order_status} />
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
                                            {item?.price?.toLocaleString(
                                              "vi-VN"
                                            )}
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-7">
              <Pagination
                onChange={(e, value) => setPageOrder(value)}
                count={totalPages}
                page={pageOrder}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </div>

        <div className="card my-5 pr-3 w-full h-[400px] bg-[#fff] py-5 pb-20 rounded-md shadow-md">
          <h2 className="text-[16px] px-5 mb-3 font-[600] w-[70%]">
            Thống kê tổng tiền và người dùng
          </h2>

          <div className="flex items-center gap-3 px-5 mb-5">
            <span
              className="flex items-center gap-2 cursor-pointer"
              onClick={getTotalSalesByYear}
            >
              <span className="block w-[10px] h-[10px] rounded-full bg-[#8884d8]"></span>
              Tổng số tiền
            </span>
            <span
              className="flex items-center gap-2 cursor-pointer"
              onClick={getTotalUsersByYear}
            >
              <span className="block w-[10px] h-[10px] rounded-full bg-[#82ca9d]"></span>
              Tổng số người dùng
            </span>
          </div>

          {chartData?.length !== 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 12 }}
                  label={{ position: "insideBottom", fontSize: 14 }}
                  style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{ position: "insideBottom", fontSize: 14 }}
                  style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#071739",
                    color: "white",
                  }}
                  labelStyle={{ color: "yellow" }}
                  itemStyle={{ color: "cyan" }}
                  cursor={{ fill: "white" }}
                />
                <Legend />
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  vertical={false}
                />
                <Bar dataKey="TotalSales" fill="#8884d8" stackId="a" />
                <Bar dataKey="TotalUsers" fill="#82ca9d" stackId="b" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* {chartData?.length !== 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  label={{ position: "insideBottom", fontSize: 14 }}
                  style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{ position: "insideBottom", fontSize: 14 }}
                  style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#071739",
                    color: "white",
                  }}
                  labelStyle={{ color: "yellow" }}
                  itemStyle={{ color: "cyan" }}
                  cursor={{ stroke: "white", strokeWidth: 1 }}
                />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="TotalSales"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="TotalUsers"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
