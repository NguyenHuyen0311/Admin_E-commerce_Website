import React, { useContext, useState } from "react";
import { myContext } from "../../App";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCat from "./editSubCat";

const SubCategory = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(myContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <section
      className={`mt-[50px] transition-all ${
        context.isSidebarOpen === true
          ? "max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]"
          : "w-full px-10"
      }`}
    >
      <div className="card mt-10 my-5 bg-[#fff] py-5 rounded-md shadow-md">
        <div className="w-full px-5 flex justify-between mb-3 items-center">
          <h2 className="text-[18px] font-bold">Danh sách danh mục con</h2>
          <div className="flex items-center gap-3">
            <Button
              className="btn-primary"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Thêm Danh Mục Con",
                })
              }
            >
              Thêm Danh Mục Con
            </Button>
          </div>
        </div>

        <div className="my-4 pt-5 pb-5 px-5 sm:rounded-lg">
          {context?.catData?.length !== 0 && (
            <ul className="w-full">
              {context?.catData?.map((firstLevelCat, index) => {
                return (
                  <li className="w-full mb-1" key={index}>
                    <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                      <span className="font-[500] flex items-center gap-4 text-[15px]">
                        {firstLevelCat?.name}
                      </span>

                      <Button
                        onClick={() => expend(index)}
                        className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      >
                        <FaAngleDown className="!text-[16px]" />
                      </Button>
                    </div>

                    {isOpen === index && (
                      <>
                        {firstLevelCat?.children?.length !== 0 && (
                          <ul className="w-full">
                            {firstLevelCat?.children?.map((subCat, index_) => {
                              return (
                                <li className="w-full py-1" key={index_}>
                                  <EditSubCat
                                    key={subCat._id + subCat.name}
                                    name={subCat?.name}
                                    catData={context?.catData}
                                    id={subCat?._id}
                                    index={index_}
                                    selectedCat={subCat?.parentId}
                                    selectedCatName={subCat?.parentCatName}
                                  />
                                  {subCat?.children?.length !== 0 && (
                                    <ul className="pl-4">
                                      {subCat?.children?.map(
                                        (thirdLevel, index__) => {
                                          return (
                                            <li
                                              key={index__}
                                              className="w-full hover:bg-[#f1f1f1]"
                                            >
                                              <EditSubCat
                                                key={
                                                  thirdLevel._id +
                                                  thirdLevel.name
                                                }
                                                name={thirdLevel?.name}
                                                catData={
                                                  firstLevelCat?.children
                                                }
                                                id={thirdLevel?._id}
                                                index={index__}
                                                selectedCat={
                                                  thirdLevel?.parentId
                                                }
                                                selectedCatName={
                                                  thirdLevel?.parentCatName
                                                }
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubCategory;
