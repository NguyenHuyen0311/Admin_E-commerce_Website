import React from 'react'
import { LuImageUp } from "react-icons/lu";

const UploadBox = (props) => {
  return (
    <div className='upload-box p-3 relative bg-gray-100 cursor-pointer flex flex-col items-center justify-center hover:bg-gray-200 !h-[150px] w-[150px] rounded-md overflow-hidden border border-dashed'>
        <LuImageUp className='text-[50px] text-gray-400' />
        <h3 className='text-[14px] font-[400] mt-1'>Tải hình ảnh</h3>

        <input type='file' multiple={props.multiple !== undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full cursor-pointer z-50 opacity-0' />
    </div>
  )
}

export default UploadBox;