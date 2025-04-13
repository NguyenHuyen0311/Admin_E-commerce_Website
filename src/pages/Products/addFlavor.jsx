import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import TooltipMUI from "@mui/material/Tooltip";
import { IoPencil, IoTrash } from "react-icons/io5";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";

const AddFlavor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productFlavor/get").then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (name === "") {
      context.openAlertBox("error", "Vui lòng nhập hương vị sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (editId === "") {
      postData("/api/product/productFlavor/create", {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox("success", res?.message);
          setName("");
          setIsLoading(false);
          getData();
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    } else {
      editData(`/api/product/productFlavor/${editId}`, {
        name: name,
      }).then((res) => {
        if (res?.data?.error === false) {
          context.openAlertBox("success", res?.data?.message);
          setTimeout(() => {
            setName("");
            setIsLoading(false);
            getData();
          }, 300);
        } else {
          context.openAlertBox("error", res?.data?.message);
        }
      });
    }
  };

  const deleteFlavor = (id) => {
    deleteData(`/api/product/productFlavor/${id}`).then((res) => {
      getData();
      context.openAlertBox("success", "Xóa hương vị sản phẩm thành công!");
    });
  };

  const editFlavor = (id) => {
    fetchDataFromApi(`/api/product/productFlavor/${id}`).then((res) => {
      setName(res?.data?.name);
      setEditId(res?.data?._id);
    });
  };

  return (
    <section
      className={`mt-[80px] transition-all ${
        context.isSidebarOpen === true
          ? "max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]"
          : "w-full px-10"
      }`}
    >
      <div className="w-full px-5 flex justify-between mb-3 items-center">
        <h2 className="text-[18px] font-bold">Thêm hương vị sản phẩm</h2>
      </div>

      <div className="w-full px-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col shadow-md items-center justify-center gap-4 p-4 border border-gray-300 rounded-md w-full"
        >
          <div className="scroll !max-h-[65vh] w-full overflow-y-scroll pr-3">
            <div className="w-full mb-3">
              <label className="text-black/90 font-medium" htmlFor="name">
                Hương vị sản phẩm
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                disabled={isLoading === true ? true : false}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>

            <Button
              type="submit"
              className="btn-org !mt-5 flex items-center justify-center gap-3 uppercase w-full font-bold !h-[40px]"
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <>
                  <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem
                </>
              )}
            </Button>
          </div>
        </form>

        {data?.length !== 0 && (
          <TableContainer
            component={Paper}
            className="mt-7 !-mr-5 shadow-sm w-full overflow-x-auto"
            sx={{ maxHeight: 500 }}
          >
            <Table stickyHeader sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Hương vị
                  </TableCell>
                  <TableCell className="border border-gray-300 whitespace-nowrap !text-center !text-[12px] uppercase !font-[700]">
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                        {item?.name}
                      </TableCell>
                      <TableCell className="border border-gray-300 whitespace-nowrap !text-center">
                        <div className="flex items-center justify-center gap-2">
                          <TooltipMUI title="Sửa">
                            <Button
                              onClick={() => editFlavor(item?._id)}
                              style={{ minWidth: "35px" }}
                              className="!w-[35px] !h-[35px] flex items-center justify-center !min-w-[35px] !rounded-full hover:!bg-[#f1f1f1]"
                            >
                              <IoPencil className="text-black/60 !text-[20px]" />
                            </Button>
                          </TooltipMUI>
                          <TooltipMUI title="Xóa">
                            <Button
                              onClick={() => deleteFlavor(item?._id)}
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
        )}
      </div>
    </section>
  );
};

export default AddFlavor;
