import { Button, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UploadBox from "../../components/UploadBox";
import { IoMdClose } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { myContext } from "../../App";
import { deleteImages, editData, fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCatName: "",
    thirdSubCatId: "",
    thirdSubCatName: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productWeight: [],
    productFlavor: [],
  });

  const context = useContext(myContext);
  const history = useNavigate();

  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productThirdSubCategory, setProductThirdSubCategory] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productFlavor, setProductFlavor] = useState([]);
  const [productFlavorData, setProductFlavorData] = useState([]); 
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);

  useEffect(() => {
    fetchDataFromApi(`/api/product/productFlavor/get`).then((res) => {
      if (res?.error === false) {
        setProductFlavorData(res?.data);
      }
    });

    fetchDataFromApi(`/api/product/productWeight/get`).then((res) => {
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });

    fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then(
      (res) => {
        setFormFields({
          name: res?.product?.name || "",
          description: res?.product?.description || "",
          images: res?.product?.images || [],
          brand: res?.product?.brand || "",
          price: res?.product?.price || "",
          oldPrice: res?.product?.oldPrice || "",
          catName: res?.product?.catName || "",
          catId: res?.product?.catId || "",
          subCatId: res?.product?.subCatId || "",
          subCatName: res?.product?.subCatName || "",
          thirdSubCatId: res?.product?.thirdSubCatId || "",
          thirdSubCatName: res?.product?.thirdSubCatName || "",
          category: res?.product?.category || "",
          countInStock: res?.product?.countInStock || "",
          rating: res?.product?.rating || "",
          isFeatured: res?.product?.isFeatured || false,
          discount: res?.product?.discount || "",
          productWeight: res?.product?.productWeight || [],
          productFlavor: res?.product?.productFlavor || [],
        });

        setProductCategory(res?.product?.catId || "");
        setProductSubCategory(res?.product?.subCatId || "");
        setProductThirdSubCategory(res?.product?.thirdSubCatId || "");
        setProductFlavor(res?.product?.productFlavor || []);
        setProductWeight(res?.product?.productWeight || []);
        setProductFeatured(res?.product?.isFeatured);

        setPreviews(res?.product?.images);
      }
    );
  }, []);

  const handleChangeProductCategory = (event) => {
    setProductCategory(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectedCatName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCategory = (event) => {
    setProductSubCategory(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectedSubCatName = (name) => {
    formFields.subCatName = name;
  };

  const handleChangeProductThirdSubCategory = (event) => {
    setProductThirdSubCategory(event.target.value);
    formFields.thirdSubCatId = event.target.value;
  };

  const selectedThirdSubCatName = (name) => {
    formFields.thirdSubCatName = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductFlavor = (event) => {
    const {
      target: { value },
    } = event;
    setProductFlavor(typeof value === "string" ? value.split(",") : value);

    formFields.productFlavor = value;
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);

    formFields.productWeight = value;
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
  };

  const setPreviewsFunc = (previewsArr) => {
    const imgArr = previews;
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr);
      formFields.images = imgArr;
    }, 10);
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImages(`/api/product/delete-image?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Vui lòng nhập tên sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.description === "") {
      context.openAlertBox("error", "Vui lòng nhập mô tả sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.catId === "") {
      context.openAlertBox("error", "Vui lòng chọn danh mục sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.oldPrice === "") {
      context.openAlertBox("error", "Vui lòng nhập giá cũ sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.price === "") {
      context.openAlertBox("error", "Vui lòng nhập giá sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.brand === "") {
      context.openAlertBox("error", "Vui lòng nhập thương hiệu sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "Vui lòng nhập số lượng sản phẩm!");
      setIsLoading(false);
      return false;
    }

    if (formFields.discount === "") {
      context.openAlertBox(
        "error",
        "Vui lòng nhập phần trăm giảm giá sản phẩm!"
      );
      setIsLoading(false);
      return false;
    }

    if (formFields.rating === "") {
      context.openAlertBox(
        "error",
        "Vui lòng chọn số sao đánh giá của sản phẩm!"
      );
      setIsLoading(false);
      return false;
    }

    if (previews.length === 0) {
      context.openAlertBox("error", "Vui lòng tải lên ảnh sản phẩm!");
      setIsLoading(false);
      return false;
    }

    editData(
      `/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`,
      formFields
    ).then((res) => {
      if (res?.data?.error === false) {
        context.openAlertBox("success", res?.data?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.openAlertBox("error", res?.data?.message);
      }
    });
  };

  return (
    <section className="p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 p-4 border border-gray-300 rounded-md"
      >
        <div className="scroll !max-h-[65vh] w-full overflow-y-scroll pr-3">
          <div className="w-full mb-3">
            <label className="text-black/90 font-medium" htmlFor="name">
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formFields.name}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
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
              value={formFields.description}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
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
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="category"
                  value={productCategory}
                  label="productCategory"
                  onChange={handleChangeProductCategory}
                  size="small"
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem
                        onClick={() => selectedCatName(cat?.name)}
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

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="category"
              >
                Danh mục sản phẩm cấp 2
              </label>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="category"
                  value={productSubCategory}
                  label="productSubCategory"
                  onChange={handleChangeProductSubCategory}
                  size="small"
                >
                  {context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem
                            onClick={() => selectedSubCatName(subCat?.name)}
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

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="category"
              >
                Danh mục sản phẩm cấp 3
              </label>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="category"
                  value={productThirdSubCategory}
                  label="productThirdSubCategory"
                  onChange={handleChangeProductThirdSubCategory}
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
                                onClick={() =>
                                  selectedThirdSubCatName(thirdSubCat?.name)
                                }
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
          </div>

          <div className="flex mb-3 items-center gap-4 w-full justify-between">
            <div className="w-[33%]">
              <label className="text-black/90 font-medium" htmlFor="old-price">
                Giá cũ
              </label>
              <input
                type="number"
                id="old-price"
                name="oldPrice"
                value={formFields.oldPrice}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
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
                value={formFields.price}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
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
                value={formFields.brand}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
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
                name="countInStock"
                value={formFields.countInStock}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
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
                name="discount"
                value={formFields.discount}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
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
                <MenuItem value={true}>Có</MenuItem>
                <MenuItem value={false}>Không</MenuItem>
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

              {productFlavorData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="flavor"
                  value={productFlavor}
                  label="productFlavor"
                  onChange={handleChangeProductFlavor}
                  size="small"
                  MenuProps={MenuProps}
                >
                  {productFlavorData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="w-[33%] flex flex-col">
              <label
                className="text-black/90 mb-2 font-medium"
                htmlFor="weight"
              >
                Cân nặng
              </label>
              {productWeightData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="weight"
                  value={productWeight}
                  label="productWeight"
                  onChange={handleChangeProductWeight}
                  size="small"
                  MenuProps={MenuProps}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item?.name}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>

          <div className="w-full mb-3 flex items-center gap-3">
            <label className="text-black/90 font-medium" htmlFor="rating">
              Đánh giá
            </label>
            <Rating
              name="rating"
              onChange={onChangeRating}
              value={formFields.rating}
              defaultValue={0}
            />
          </div>

          <div className="w-full">
            <h3 className="text-black/90 mb-3 font-medium">Tải ảnh sản phẩm</h3>

            <div className="flex items-center flex-wrap gap-4">
              {previews?.length !== 0 &&
                previews?.map((image, index) => {
                  return (
                    <div key={image} className="image-uploaded-wrap relative">
                      <span
                        onClick={() => removeImg(image, index)}
                        className="absolute w-[22px] h-[22px] rounded-full overflow-hidden bg-red-700 -top-[5px] cursor-pointer -right-[10px] flex items-center z-50 justify-center"
                      >
                        <IoMdClose className="text-white text-[18px]" />
                      </span>

                      <div className="image-uploaded !p-4 relative bg-gray-100 cursor-pointer flex items-center justify-center hover:bg-gray-200 !h-[150px] w-[150px] rounded-md overflow-hidden border border-dashed">
                        <LazyLoadImage
                          className="w-full h-full rounded-md object-cover"
                          alt={"image"}
                          // effect="blur"
                          wrapperProps={{
                            style: { transitionDelay: "1s" },
                          }}
                          src={image}
                        />
                      </div>
                    </div>
                  );
                })}

              <UploadBox
                multiple={true}
                setPreviews={setPreviewsFunc}
                name="images"
                url="/api/product/upload-images"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="btn-org !mt-5 flex items-center justify-center gap-3 uppercase w-full font-bold !h-[40px]"
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
    </section>
  );
};

export default EditProduct;
