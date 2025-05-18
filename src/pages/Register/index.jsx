import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";
import { useContext } from "react";
import { myContext } from "../../App";

function Register() {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(myContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const validateValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Vui lòng nhập họ và tên!");
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "Vui lòng nhập email!");
      return false;
    }

    if (formFields.password === "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu!");
      return false;
    }

    postData("/api/admin/register", formFields).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        
        setFormFields({
          name: "",
          email: "",
          password: "",
        });
        
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="w-full h-full">
      <header className="w-full top-0 left-0 px-4 py-2 flex items-center">
        <Link to="/" className="w-[20%]">
          <img src="/logo.png" className="w-[200px] object-contain h-[60px]" />
        </Link>

        <div className="flex ml-auto items-center mt-5 gap-5 justify-end">
          <Link to="/login">
            <Button className="btn-border w-full !px-5 flex items-center gap-2">
              <MdLogin className="text-[18px]" /> Đăng nhập
            </Button>
          </Link>
        </div>
      </header>

      <div className="card shadow-md mt-10 w-[600px] m-auto rounded-md bg-white p-5 px-10">
        <h3 className="text-center text-[18px] text-black font-[600]">
          Đăng Ký Tài khoản Admin
        </h3>

        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <div className="form-group w-full mb-5">
            <TextField
              className="w-full"
              id="name"
              name="name"
              value={formFields.name}
              disabled={isLoading === true ? true : false}
              type="text"
              label="Họ và Tên"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group w-full mb-5">
            <TextField
              className="w-full"
              id="email"
              name="email"
              value={formFields.email}
              disabled={isLoading === true ? true : false}
              type="email"
              label="Email"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={onChangeInput}
            />
          </div>

          <div className="relative form-group w-full mb-5">
            <TextField
              className="w-full"
              id="password"
              name="password"
              value={formFields.password}
              disabled={isLoading === true ? true : false}
              type={isShowPassword ? "password" : "text"}
              label="Mật khẩu"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={onChangeInput}
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

          <div className="flex items-center mt-4 mb-3">
            <Button
                type="submit"
                disabled={!validateValue}
                className="btn-org w-full"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Đăng ký"
                )}
              </Button>
          </div>

          <p className="text-[14px] w-full font-[400] flex items-center justify-center gap-2">
            Bạn đã có tài khoản?
            <Link
              className="link cursor-pointer !text-[14px] !font-[600] !text-[#ff5252] !no-underline"
              to="/login"
            >
              Đăng Nhập
            </Link>
          </p>

          {/* <div className="flex items-center my-5">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">HOẶC</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <Button className="gap-2 !mb-4 w-full !text-black/80 !font-[500] !bg-[#f1f1f1] flex items-center justify-center">
            <FcGoogle className="text-[20px]" />
            Đăng nhập với Google
          </Button> */}
        </form>
      </div>
    </section>
  );
}

export default Register;
