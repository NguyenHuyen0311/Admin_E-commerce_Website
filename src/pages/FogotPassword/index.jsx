import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff, IoMdReturnRight } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { myContext } from "../../App";
import { postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPassword2, setIsShowPassword2] = useState(true);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
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

    if (formFields.newPassword === "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu mới!");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword === "") {
      context.openAlertBox("error", "Vui lòng nhập xác nhận mật khẩu mới!");
      setIsLoading(false);
      return false;
    }

    if (formFields.newPassword !== formFields.confirmPassword) {
      context.openAlertBox("error", "Mật khẩu không trùng khớp!");
      setIsLoading(false);
      return false;
    }

    postData(`/api/user/reset-password`, formFields).then((res) => {
      if (res?.error === false) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");

        context.openAlertBox("success", res?.message);

        setIsLoading(false);
        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
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

      <div className="card shadow-md mt-10 w-[400px] m-auto rounded-md bg-white p-5 px-10">
        <h3 className="text-center text-[18px] text-black font-[600]">
          Đổi Mật Khẩu Admin
        </h3>

        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <div className="form-group w-full mb-4 relative">
            <TextField
              className="w-full"
              name="newPassword"
              id="newPassword"
              value={formFields.newPassword}
              disabled={isLoading === true ? true : false}
              type={isShowPassword ? "password" : "text"}
              label="Mật khẩu mới"
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

          <div className="relative form-group w-full mb-3">
            <TextField
              className="w-full"
              name="confirmPassword"
              id="confirmPassword"
              value={formFields.confirmPassword}
              disabled={isLoading === true ? true : false}
              type={isShowPassword2 ? "password" : "text"}
              label="Xác nhận mật khẩu"
              variant="outlined"
              size="small"
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              onChange={onChangeInput}
            />

            <Button
              onClick={() => setIsShowPassword2(!isShowPassword2)}
              className="!absolute top-[5px] right-[5px] !w-[30px] !h-[30px] !rounded-full !min-w-[30px] !text-black opacity-70"
            >
              {isShowPassword2 ? (
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
                "Xác nhận thay đổi"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
