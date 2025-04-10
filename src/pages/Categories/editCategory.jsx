import React, { useContext, useEffect } from "react";
import UploadBox from "../../components/UploadBox";
import { Button } from "@mui/material";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";

const EditCategory = () => {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const context = useContext(myContext);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/category/${id}`).then((res) => {
        console.log(res);
        formFields.name = res?.category.name;
        setPreviews(res?.category.images);
    })
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
    formFields.images = previews;
  };

  const setPreviewsFunc = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImages(`/api/category/delete-image?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = previewsArr;
      }, 100);
    });
  };

  const validateValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục!");
      setIsLoading(false);
      return false;
    }

    if (previews.length === 0) {
      context.openAlertBox("error", "Vui lòng chọn ảnh danh mục!");
      setIsLoading(false);
      return false;
    }

    editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      }, 1500);
    });
  };

  return (
    <form className="p-10" onSubmit={handleSubmit}>
      <div className="w-[300px] mb-10">
        <label className="text-black/90 font-medium" htmlFor="name">
          Tên danh mục
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

      <label className="text-black/90 font-medium" htmlFor="name">
        Hình ảnh danh mục
      </label>

      <div className="upload-box-wrap mt-3 flex items-center w-full flex-wrap gap-5">
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
          url="/api/category/upload-images"
        />
      </div>

      <Button
        type="submit"
        disabled={!validateValue}
        className="btn-org !mt-10 flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
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
  );
};

export default EditCategory;
