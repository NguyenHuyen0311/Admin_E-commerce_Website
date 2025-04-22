import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { myContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";
import { Collapse } from "react-collapse";
import Avatar from "../../components/Avatar";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      history("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });

    setChangePassword(() => {
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

    if (formFields.mobile === "") {
      context.openAlertBox("error", "Vui lòng nhập số điện thoại!");
      return false;
    }

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.openAlertBox("success", res?.data?.message);
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  const validateValue2 = Object.values(changePassword).every((el) => el);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu mới!");
      return false;
    }

    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Vui lòng nhập xác nhận mật khẩu mới!");
      return false;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.openAlertBox(
        "error",
        "Mật khẩu mới và xác nhận mật khẩu không trùng khớp!"
      );
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading2(false);
        context.openAlertBox("success", res?.message);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  return (
    <section
      className={`mt-[50px] transition-all ${
        context.isSidebarOpen === true
          ? "max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]"
          : "w-full px-10"
      }`}
    >
      <div className="card mt-10 my-5 bg-[#fff] py-5 rounded-md">
        <div className="card bg-white p-5 shadow-md rounded-md">
          <div className="flex items-center justify-between border-b !pb-2">
            <h2 className="text-[15px] font-[600]">Trang cá nhân</h2>
            <Button
              onClick={() =>
                setIsChangePasswordFormShow(!isChangePasswordFormShow)
              }
            >
              Đổi Mật Khẩu
            </Button>
          </div>

          <Avatar />

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5">
              <div className="w-[50%]">
                <TextField
                  id="outlined-basic"
                  label="Họ và tên"
                  variant="outlined"
                  name="name"
                  value={formFields.name}
                  disabled={isLoading === true ? true : false}
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={onChangeInput}
                />
              </div>
              <div className="w-[50%]">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  name="email"
                  value={formFields.email}
                  disabled={true}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="flex items-center mt-5">
              <div className="w-[49%]">
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  name="mobile"
                  value={formFields.mobile}
                  disabled={isLoading === true ? true : false}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="flex items-center mt-5">
              <Button
                type="submit"
                disabled={!validateValue}
                className="btn-org !px-5"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Lưu thay đổi"
                )}
              </Button>
            </div>
          </form>
        </div>

        <Collapse isOpened={isChangePasswordFormShow}>
          <div className="card bg-white p-5 mt-4 shadow-md rounded-md">
            <div className="flex items-center justify-between border-b !pb-2">
              <h2 className="text-[15px] font-[600]">Đổi mật khẩu</h2>
            </div>
            <form className="mt-5" onSubmit={handleSubmit2}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    id="outlined-basic"
                    label="Mật khẩu mới"
                    type="text"
                    variant="outlined"
                    name="newPassword"
                    value={changePassword.newPassword}
                    disabled={isLoading2 === true ? true : false}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={changePassword.confirmPassword}
                    disabled={isLoading2 === true ? true : false}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                    onChange={onChangeInput}
                  />
                </div>
              </div>

              <div className="flex items-center mt-5">
                <Button
                  type="submit"
                  disabled={!validateValue2}
                  className="btn-org !px-5"
                >
                  {isLoading2 === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    </section>
  );
}

export default Profile;
