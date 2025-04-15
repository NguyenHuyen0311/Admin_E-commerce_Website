import React, { useContext } from "react";
import UploadBox from "../../components/UploadBox";
import { Button } from "@mui/material";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Editor from 'react-simple-wysiwyg';
import { useEffect } from "react";

const EditBlog = () => {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState('');
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    images: [],
  });

  const context = useContext(myContext);
  const history = useNavigate();

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/blog/${id}`).then((res) => {
        formFields.title = res?.blog.title;
        formFields.description = res?.blog.description;
        formFields.images = res?.blog.images;
        setPreviews(res?.blog.images);
        setHtml(res?.blog.description)
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
  };

  const onChangeDescription = (e) => {
    setHtml(e.target.value);
    formFields.description = e.target.value;
  }

  const setPreviewsFunc = (previewsArr) => {
    setPreviews(previewsArr);
    formFields.images = previewsArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImages(`/api/blog/delete-image?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const validateValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.title === "") {
      context.openAlertBox("error", "Vui lòng nhập tiêu đề bài viết!");
      setIsLoading(false);
      return false;
    }

    if (formFields.description === "") {
      context.openAlertBox("error", "Vui lòng nhập mô tả của bài viết!");
      setIsLoading(false);
      return false;
    }

    if (previews.length === 0) {
      context.openAlertBox("error", "Vui lòng chọn ảnh bài viết!");
      setIsLoading(false);
      return false;
    }

    editData(`/api/blog/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        history("/blogs");
      }, 1500);
    });
  };

  return (
    <form className="p-10" onSubmit={handleSubmit}>
      <div className="w-full mb-10 flex flex-col">
        <label className="text-black/90 font-medium" htmlFor="name">
          Tiêu đề bài viết
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formFields.title}
          disabled={isLoading === true ? true : false}
          onChange={onChangeInput}
          className="w-[300px] mt-2 mb-4 h-[40px] border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none px-2"
        />

        <label className="text-black/90 font-medium" htmlFor="name">
          Mô tả
        </label>
        <Editor containerProps={{ style: { resize: 'vertical' } }} value={html} onChange={onChangeDescription} />
      </div>

      <label className="text-black/90 font-medium" htmlFor="name">
        Hình ảnh bài viết
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
          multiple={false}
          setPreviews={setPreviewsFunc}
          name="images"
          url="/api/blog/upload-images"
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

export default EditBlog;
