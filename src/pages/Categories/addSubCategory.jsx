import React, { useContext, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";
import { myContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const AddSubCategory = () => {
  const [categoryL1Fil, setCategoryL1Fil] = useState("");
  const [categoryL2Fil, setCategoryL2Fil] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(myContext);

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleChangeCategoryL2Fil = (event) => {
    setCategoryL2Fil(event.target.value);
    formFields2.parentId = event.target.value;
  };


  const selectedCatFunc = (catName) => {
    formFields.parentCatName = catName;
  }

  const selectedCatFunc2 = (catName) => {
    formFields2.parentCatName = catName;
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const catId = categoryL1Fil;

    setCategoryL1Fil(catId);
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    const catId = categoryL2Fil;

    setCategoryL2Fil(catId);
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục con!");
      setIsLoading(false);
      return false;
    }

    if (categoryL1Fil === "") {
      context.openAlertBox("error", "Vui lòng chọn danh mục cấp trên!");
      setIsLoading(false);
      return false;
    }

    postData("/api/category/create", formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
      }, 1500);
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (formFields2.name === "") {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục con!");
      setIsLoading2(false);
      return false;
    }

    if (categoryL2Fil === "") {
      context.openAlertBox("error", "Vui lòng chọn danh mục cấp trên!");
      setIsLoading2(false);
      return false;
    }

    postData("/api/category/create", formFields2).then((res) => {
      setTimeout(() => {
        setIsLoading2(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getCat();
      }, 1500);
    });
  };

  return (
    <div className="p-10 w-full flex items-center justify-between flex-wrap">
      <form onSubmit={handleSubmit} className="w-[45%] gap-7 flex flex-col">
        <h2 className="text-[20px] font-[600]">Thêm danh mục con cấp 2</h2>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium">
            Các danh mục cấp 1
          </label>

          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryL1Fil}
            onChange={handleChangeCategoryL1Fil}
            label="CategoryL1"
            size="small"
            className="rounded !h-[40px]"
          >
            {context?.catData.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  <MenuItem onClick={() => selectedCatFunc(item?.name)} key={index} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium" htmlFor="name">
            Tên danh mục con cấp 2
          </label>
          <input
            type="text"
            onChange={onChangeInput}
            value={formFields.name}
            id="name"
            name="name"
            className="w-full h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
          />
        </div>

        <Button
          type="submit"
          className="btn-org flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
        >
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem
            </>
          )}
        </Button>
      </form>

      <form onSubmit={handleSubmit2} className="w-[45%] gap-7 flex flex-col">
        <h2 className="text-[20px] font-[600]">Thêm danh mục con cấp 3</h2>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium">
            Các danh mục cấp 2
          </label>

          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryL2Fil}
            onChange={handleChangeCategoryL2Fil}
            label="CategoryL2"
            size="small"
            className="rounded !h-[40px]"
          >
            {context?.catData.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  item?.children?.length !== 0 && item?.children?.map((item2, index) => {
                    return (
                      <MenuItem onClick={() => selectedCatFunc2(item2?.name)} key={index} value={item2?._id}>
                        {item2?.name}
                      </MenuItem>
                    );
                  })
                )
              })}
          </Select>
        </div>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium" htmlFor="name">
            Tên danh mục con cấp 3
          </label>
          <input
            type="text"
            onChange={onChangeInput2}
            value={formFields2.name}
            id="name"
            name="name"
            className="w-full h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
          />
        </div>

        <Button
          type="submit"
          className="btn-org flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
        >
          {isLoading2 === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddSubCategory;
