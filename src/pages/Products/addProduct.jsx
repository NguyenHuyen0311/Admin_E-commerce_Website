import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UploadBox from "../../components/UploadBox";
import { IoMdClose } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AddProduct = () => {
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productFlavor, setProductFlavor] = useState("");
  const [productWeight, setProductWeight] = useState("");

  const handleChangeProductCategory = (event) => {
    setProductCategory(event.target.value);
  };

  const handleChangeProductSubCategory = (event) => {
    setProductSubCategory(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  const handleChangeProductFlavor = (event) => {
    setProductFlavor(event.target.value);
  };

  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  return (
    <section className="p-8">
      <form className="flex flex-col items-center justify-center gap-4 p-4 border border-gray-300 rounded-md">
        <div className="scroll !max-h-[65vh] w-full overflow-y-scroll pr-3">
          <div className="w-full mb-3">
            <label className="text-black/90 font-medium" htmlFor="name">
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
            />
          </div>

          <div className="w-full mb-3">
            <label className="text-black/90 font-medium" htmlFor="description">
              Mô tả sản phẩm
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full mt-2 h-[100px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
            ></textarea>
          </div>

          <div className="w-full mb-3 flex items-center gap-4">
            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="category"
              >
                Danh mục sản phẩm
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={productCategory}
                label="productCategory"
                onChange={handleChangeProductCategory}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="category"
              >
                Danh mục sản phẩm cấp 2
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={productSubCategory}
                label="productSubCategory"
                onChange={handleChangeProductSubCategory}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="category"
              >
                Danh mục sản phẩm cấp 3
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={productCategory}
                label="productCategory"
                onChange={handleChangeProductCategory}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex mb-3 items-center gap-4 w-full justify-between">
            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="old-price">
                Giá cũ
              </label>
              <input
                type="number"
                id="old-price"
                name="old-price"
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>

            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="price">
                Giá sản phẩm
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>
            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="brand">
                Thương hiệu
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>
          </div>

          <div className="flex mb-3 items-center gap-4 w-full justify-between">
            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="stock">
                Số lượng
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>

            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="sales">
                Giảm giá
              </label>
              <input
                type="text"
                id="sales"
                name="sales"
                className="w-full mt-2 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
              />
            </div>
            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="featured"
              >
                Sản phẩm nổi bật
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="featured"
                value={productFeatured}
                label="productFeatured"
                onChange={handleChangeProductFeatured}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Có</MenuItem>
                <MenuItem value={20}>Không</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex mb-3 items-center gap-4 w-full">
            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="flavor"
              >
                Hương vị
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="flavor"
                value={productFlavor}
                label="productFlavor"
                onChange={handleChangeProductFlavor}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="weight"
              >
                Cân nặng
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="weight"
                value={productWeight}
                label="productWeight"
                onChange={handleChangeProductWeight}
                size="small"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>

          <div className="w-full mb-3 flex items-center gap-3">
            <label className="text-black/90 font-medium" htmlFor="rating">
              Đánh giá
            </label>
            <Rating defaultValue={1} />
          </div>

          <div className="w-full">
            <h3 className="text-black/90 mb-3 font-medium">Tải ảnh sản phẩm</h3>

            <div className="flex items-center flex-wrap gap-4">
              <div className="image-uploaded-wrap relative">
                <span className="absolute w-[22px] h-[22px] rounded-full overflow-hidden bg-red-700 -top-[5px] cursor-pointer -right-[10px] flex items-center z-50 justify-center">
                  <IoMdClose className="text-white text-[18px]" />
                </span>

                <div className="image-uploaded p-4 relative bg-gray-100 cursor-pointer flex items-center justify-center hover:bg-gray-200 !h-[150px] w-[150px] rounded-md overflow-hidden border border-dashed">
                  <LazyLoadImage
                    className="w-full h-full rounded-md object-cover"
                    alt={"image"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    src={
                      ""
                    }
                  />
                </div>
              </div>

              <UploadBox multiple={true} />
            </div>
          </div>

        </div>
          <Button
            type="submit"
            className="btn-org !mt-5 flex items-center justify-center gap-3 uppercase w-full font-bold !h-[40px]"
          >
            <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem Sản Phẩm
          </Button>
      </form>
    </section>
  );
};

export default AddProduct;
