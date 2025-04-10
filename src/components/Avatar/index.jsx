import React, { useContext, useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { uploadImage } from "../../utils/api";
import { myContext } from "../../App";
import { CircularProgress } from "@mui/material";

const Avatar = () => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    const userAvatar = [];

    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

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
          formdata.append(`avatar`, file);
        } else {
          context.openAlertBox(
            "error",
            "Vui lòng chọn ảnh kiểu JPEG, JPG, PNG hoặc WEBP!"
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);

        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);

        context.setUserData((prev) => ({
          ...prev,
          avatar: avatar,
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="group flex items-center justify-center mt-3 bg-gray-200 w-[100px] h-[100px] cursor-pointer overflow-hidden bg-center relative mb-4 rounded-full">
      {uploading === true ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          {previews?.length !== 0 ? (
            previews?.map((img, index) => {
              return (
                <img
                  src={img}
                  key={index}
                  className="w-full h-full object-cover"
                />
              );
            })
          ) : (
            <img
              src="/user-avatar-default.png"
              className="w-full h-full object-cover"
            />
          )}
        </>
      )}

      <div className="upload-avatar group-hover:opacity-100 opacity-0 transition-all absolute w-full h-full top-0 left-0 flex items-center justify-center rounded-full bg-black/70">
        <IoMdCloudUpload className="text-[#fff] text-[25px]" />
        <input
          type="file"
          accept="image/*"
          className="absolute cursor-pointer w-full h-full top-0 left-0 opacity-0"
          onChange={(e) => {
            onChangeFile(e, "/api/user/user-avatar");
          }}
          name="avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
