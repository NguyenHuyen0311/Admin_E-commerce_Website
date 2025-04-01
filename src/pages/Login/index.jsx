import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoMdReturnRight } from "react-icons/io";
import TextField from "@mui/material/TextField";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { myContext } from "../../App";
import { Checkbox, FormControlLabel } from "@mui/material";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const context = useContext(myContext);
  const history = useNavigate();

  const forgotPassword = () => {
    history("/verify");
    context.openAlertBox("success", "Mã OTP đã được gửi!");
  };

  return (
    <section className="w-full h-full">
      <header className="w-full top-0 left-0 px-4 py-2 flex items-center">
        <Link to="/" className="w-[20%]">
          <img src="/logo.png" className="w-[200px] object-contain h-[60px]" />
        </Link>

        <div className="flex ml-auto items-center mt-5 gap-5 justify-end">
          <Link to="/register">
            <Button className="btn-border w-full !px-5 flex items-center gap-2">
              <IoMdReturnRight className="text-[18px]" /> Đăng ký
            </Button>
          </Link>
        </div>
      </header>

      <div className="card shadow-md w-[600px] mt-10 m-auto rounded-md bg-white p-5 px-10">
        <h3 className="text-center text-[28px] text-black font-[700]">
          Chào mừng trở lại!
        </h3>
        <h3 className="text-center text-[28px] text-black font-[700]">
          Đăng Nhập với Tài khoản Admin
        </h3>

        <form className="w-full mt-5">
          <div className="form-group w-full mb-5">
            <TextField
              className="w-full"
              name="email"
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              required
            />
          </div>

          <div className="relative form-group w-full mb-3">
            <TextField
              className="w-full"
              name="password"
              id="password"
              type={isShowPassword ? "password" : "text"}
              label="Mật khẩu"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              required
            />

            <Button
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="!absolute top-[5px] right-[5px] !w-[30px] !h-[30px] !rounded-full !min-w-[30px] !text-black opacity-70"
            >
              {isShowPassword ? (
                <>
                  <IoMdEyeOff className="text-[20px]" />
                </>
              ) : (
                <>
                  <IoMdEye className="text-[20px]" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Ghi nhớ tài khoản" />
    
            <a
              onClick={forgotPassword}
              className="link cursor-pointer text-[13px] font-[500]"
            >
              Quên mật khẩu?
            </a>
          </div>


          <div className="flex items-center mt-4 mb-3">
            <Button className="btn-org w-full">Đăng nhập</Button>
          </div>

          <div className="flex items-center my-5">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">HOẶC</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <Button className="gap-2 !mb-4 w-full !text-black/80 !font-[500] !bg-[#f1f1f1] flex items-center justify-center">
            <FcGoogle className="text-[20px]" />
            Đăng nhập với Google
          </Button>

          <p className="text-[14px] w-full font-[400] flex items-center justify-center gap-2">
            Bạn chưa có tài khoản?
            <Link
              className="link cursor-pointer !text-[14px] !font-[600] !text-[#ff5252] !no-underline"
              to="/register"
            >
              Đăng Ký
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
