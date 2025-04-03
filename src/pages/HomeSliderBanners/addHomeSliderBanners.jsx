import React from "react";
import UploadBox from "../../components/UploadBox";
import { Button } from "@mui/material";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AddHomeSliderBanners = () => {
  return (
    <div className="p-10">
      <div className="upload-box-wrap flex items-center w-full flex-wrap gap-5">
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
              src={""}
            />
          </div>
        </div>

        <UploadBox multiple={true} />
      </div>

      <Button
        type="submit"
        className="btn-org !mt-10 flex items-center justify-center gap-3 uppercase !px-8 font-bold !h-[40px]"
      >
        <IoMdCloudUpload className="text-[30px]" /> Lưu và Xem Ảnh
      </Button>
    </div>
  );
};

export default AddHomeSliderBanners;
