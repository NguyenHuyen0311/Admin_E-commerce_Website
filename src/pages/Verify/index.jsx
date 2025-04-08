import React, { useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { IoMdReturnRight } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { MdLogin } from "react-icons/md";
import { useContext } from "react";
import { myContext } from "../../App";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

function Verify() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(myContext);

  const verifyOTP = (e) => {
    e.preventDefault();
    
    if(otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");
  
      if(actionType !== "forgot-password") {
        postData("/api/user/verify", {
          email: localStorage.getItem("userEmail"),
          otp: otp
        }).then((res) => {
          if(res?.error === false) {
            context.openAlertBox("success", res?.message);
            localStorage.removeItem("userEmail")

            setIsLoading(false);
            history("/login");
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        })
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp
        }).then((res) => {
          if(res?.error === false) {
            context.openAlertBox("success", res?.message);
            history("/forgot-password");
          } else {
            context.openAlertBox("error", res?.message);
          }
        })
      }
    } else {
      context.openAlertBox("error", "Vui lòng đầy đủ nhập mã OTP!");
    }
    
  }

  return (
    <section className="w-full h-full">
      <header className="w-full top-0 left-0 px-4 py-2 flex items-center">
        <Link to="/" className="w-[20%]">
          <img src="/logo.png" className="w-[200px] object-contain h-[60px]" />
        </Link>

        <div className="flex ml-auto items-center mt-5 gap-5 justify-end">
          <Link to="/login">
            <Button className="btn-org w-full !px-5 flex items-center gap-2">
              <MdLogin className="text-[18px]" /> Đăng nhập
            </Button>
          </Link>
          <Link to="/register">
            <Button className="btn-border w-full !px-5 flex items-center gap-2">
              <IoMdReturnRight className="text-[18px]" /> Đăng ký
            </Button>
          </Link>
        </div>
      </header>

      <div className="card  mt-10 shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
        <div className="text-center flex items-center justify-center">
          <img src="/verify.png" width="80px" />
        </div>

        <h3 className="text-center mb-2 mt-3 text-[15px] text-black font-[600]">
          Xác minh OTP
        </h3>

        <p className="text-center text-[13px] mb-4">
          OTP được gửi vào{" "}
          <span className="text-[#ff5252] mt-2 font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>

        <form onSubmit={verifyOTP}>
          <OtpBox length={6} onChange={handleOtpChange} />

          <div className="flex items-center justify-center mt-5 px-1">
            <Button
                type="submit"
                className="btn-org w-full"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Xác nhận OTP"
                )}
              </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Verify;
