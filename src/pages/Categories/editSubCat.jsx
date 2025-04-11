import React, { useContext, useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { IoPencil, IoTrash } from "react-icons/io5";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteData, editData } from "../../utils/api";

const EditSubCat = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectVal, setSelectVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(myContext);

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentCatName = props?.selectedCatName;
    formFields.parentId = props?.selectedCat;
    setSelectVal(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectVal;
    setSelectVal(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleChange = (event) => {
    setSelectVal(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Vui lòng nhập tên danh mục con!");
      setIsLoading(false);
      return false;
    }

    editData(`/api/category/${props?.id}`, formFields).then((res) => {
      setTimeout(() => {
        context.openAlertBox("success", res?.data?.message);
        setIsLoading(false);
        context?.getCat();
      }, 1000);
    });
  }

  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      context?.getCat();
    })
  }

  return (
    <form className="w-100 flex items-center gap-3 p-0 px-4" onSubmit={handleSubmit}>
      {editMode === true && (
        <>
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="w-[150px]">
              <Select
                inputProps={{ "aria-label": "Without label" }}
                className="w-full"
                size="small"
                displayEmpty
                value={selectVal}
                onChange={handleChange}
                sx={{ fontSize: "14px", height: "30px" }}
              >
                {props?.catData?.length !== 0 &&
                  props?.catData?.map((item, index) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "14px" }}
                        value={item?._id}
                        key={index}
                        onClick={() => {
                          formFields.parentCatName = item?.name;
                        }}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>

            <input
              type="text"
              className="w-full h-[30px] border focus:outline-none focus:!border-[rgba(0, 0, 0, 0.4)] !rounded-sm py-3 px-2 text-sm"
              name="name"
              value={formFields?.name}
              onChange={onChangeInput}
            />

            <div className="flex items-center gap-2">
              <Button
                size="small"
                className="btn-org !w-[100px]"
                type="submit"
                variant="contained"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>Cập nhật</>
                )}
              </Button>
              <Button
                className="btn-border"
                size="small"
                variant="outlined"
                onClick={() => setEditMode(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </>
      )}
      {editMode === false && (
        <>
          <span className="font-[500] text-[14px]">{props?.name}</span>
          <div className="flex items-center ml-auto gap-2">
            <Button
              onClick={() => {
                setEditMode(true);
              }}
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black/70"
            >
              <IoPencil className="text-[16px]" />
            </Button>
            <Button onClick={() => deleteCat(props?.id)} className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black/70">
              <IoTrash className="text-[16px]" />
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCat;
