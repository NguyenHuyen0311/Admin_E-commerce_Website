import React from "react";

function Badge(props) {
  return (
    <span
      className={`inline-block py-2 px-4 font-[500] rounded-full ${
        props.status === "Chờ xác nhận" && "bg-[#ff5252] text-white"
      } ${props.status === "Đã xác nhận" && "bg-blue-500 text-white"} ${
        props.status === "Đang chuẩn bị hàng" && "bg-yellow-500 text-white"
      } ${
        props.status === "Đang giao hàng" && "bg-purple-500 text-white"
      } ${
        props.status === "Đã giao hàng" && "bg-green-700 text-white"
      }`}
    >
      {props.status}
    </span>
  );
}

export default Badge;
