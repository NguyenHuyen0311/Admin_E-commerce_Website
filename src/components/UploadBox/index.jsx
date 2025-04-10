import React from "react";
import { useState } from "react";
import { LuImageUp } from "react-icons/lu";
import { uploadImage } from "../../utils/api";
import { useContext } from "react";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(myContext);
  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append(props?.name, file);
        } else {
          context.openAlertBox(
            "error",
            "Vui lòng chọn ảnh có định dạng JPG, PNG, JPEG hoặc WEBP!"
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        props.setPreviews(res?.data?.images);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload-box p-3 relative bg-gray-100 cursor-pointer flex flex-col items-center justify-center hover:bg-gray-200 !h-[150px] w-[150px] rounded-md overflow-hidden border border-dashed">
      {uploading === true ? (
        <CircularProgress />
      ) : (
        <>
          <LuImageUp className="text-[50px] text-gray-400" />
          <h3 className="text-[14px] font-[400] mt-1">Tải hình ảnh</h3>

          <input
            onChange={(e) => onChangeFile(e, props?.url)}
            name="images"
            type="file"
            accept="image/*"
            multiple={props.multiple !== undefined ? props.multiple : false}
            className="absolute top-0 left-0 w-full h-full cursor-pointer z-50 opacity-0"
          />
        </>
      )}
    </div>
  );
};

export default UploadBox;
