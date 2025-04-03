import React, { useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { IoMdCloudUpload } from "react-icons/io";

const AddSubCategory = () => {
  const [categoryL1Fil, setCategoryL1Fil] = useState("");

  const handleChangeCategoryL1Fil = (event) => {
    setCategoryL1Fil(event.target.value);
  };
  return (
    <div className="p-10 w-full flex items-center justify-between flex-wrap">
      <div className="w-[45%] gap-7 flex flex-col">
        <h2 className="text-[20px] font-[600]">Thêm danh mục con cấp 2</h2>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium">Các danh mục cấp 1</label>

          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryL1Fil}
            onChange={handleChangeCategoryL1Fil}
            label="CategoryL1"
            size="small"
            className="rounded !h-[40px]"
          >
            <MenuItem value="">Không</MenuItem>
            <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
            <MenuItem value={20}>Đồ mặn</MenuItem>
            <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
          </Select>
        </div>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium" htmlFor="name">
            Tên danh mục con cấp 2
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
          />
        </div>
        <Button
          type="submit"
          className="btn-org flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
        >
          <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem
        </Button>
      </div>

      <div className="w-[45%] gap-7 flex flex-col">
        <h2 className="text-[20px] font-[600]">Thêm danh mục con cấp 3</h2>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium">Các danh mục cấp 2</label>

          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={categoryL1Fil}
            onChange={handleChangeCategoryL1Fil}
            label="CategoryL1"
            size="small"
            className="rounded !h-[40px]"
          >
            <MenuItem value="">Không</MenuItem>
            <MenuItem value={10}>Đồ ăn nhẹ</MenuItem>
            <MenuItem value={20}>Đồ mặn</MenuItem>
            <MenuItem value={30}>Đồ khỏe mạnh</MenuItem>
          </Select>
        </div>

        <div className="col-1 flex flex-col gap-3">
          <label className="text-black/90 font-medium" htmlFor="name">
            Tên danh mục con cấp 3
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
          />
        </div>
        <Button
          type="submit"
          className="btn-org flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
        >
          <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem
        </Button>
      </div>
    </div>
  );
};

export default AddSubCategory;
