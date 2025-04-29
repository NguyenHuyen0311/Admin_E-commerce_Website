import React, { useEffect, useState } from "react";
import UploadBox from "../../components/UploadBox";
import { Button } from "@mui/material";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useContext } from "react";
import { myContext } from "../../App";
import { deleteImages, editData, fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const EditHomeSliderBanners = () => {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    images: [],
  });

  const context = useContext(myContext);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;
    if (id) {
      fetchDataFromApi(`/api/homeSlider/${id}`).then((res) => {
        const images = res?.slide?.images || [];
  
        setPreviews(images);
        setFormFields((prev) => ({
          ...prev,
          images,
        }));
      });
    }
  }, []);  

  const setPreviewsFunc = (previewsArr) => {
    setPreviews(previewsArr);
    setFormFields((prev) => ({
      ...prev,
      images: previewsArr,
    }));
  };  

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImages(`/api/homeSlider/delete-image?img=${image}`).then((res) => {
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
  
      if (previews.length === 0) {
        context.openAlertBox("error", "Vui lòng chọn ảnh quảng cáo!");
        setIsLoading(false);
        return false;
      }
  
      editData(`/api/homeSlider/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
        }, 1000);
      });
    };

  return (
    <form onSubmit={handleSubmit} className="p-10">
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
                    effect="blur"
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
          url="/api/homeSlider/upload-images"
        />
      </div>

      <Button
        type="submit"
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

export default EditHomeSliderBanners;
