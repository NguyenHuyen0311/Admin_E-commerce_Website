import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router";
import { fetchDataFromApi } from "../../utils/api";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [swiperSmall, setSwiperSmall] = useState(null);
  const [swiperBig, setSwiperBig] = useState(null);
  const [product, setProduct] = useState();

  const context = useContext(myContext);

  const { id } = useParams();

  const goto = (index) => {
    setSliderIndex(index);

    if (swiperSmall) {
      const totalSlides = swiperSmall.slides.length;
      const targetIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
      swiperSmall.slideTo(targetIndex);
    }
    if (swiperBig) swiperBig.slideTo(index);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProduct(res?.product);
      }
    });
  }, []);
  console.log("Rating:", product?.rating);

  return (
    <section
      className={`mt-[80px] transition-all ${
        context.isSidebarOpen === true
          ? "max-w-[100vw] w-[100%] overflow-hidden px-3 ml-[20%]"
          : "w-full px-10"
      }`}
    >
      <div className="w-full px-5 flex justify-between mb-3 items-center">
        <h2 className="text-[18px] font-bold">Chi tiết sản phẩm</h2>
      </div>

      <div className="flex w-full gap-4">
        <div className="w-[40%]">
          {product?.images?.length !== 0 && (
            <>
              <div className="flex gap-4">
                <div className="slider w-[15%]">
                  <Swiper
                    onSwiper={setSwiperSmall}
                    direction={"vertical"}
                    slidesPerView={4}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="zoom-product-slider home-category-slider-container max-h-[350px] overflow-hidden"
                  >
                    {product?.images?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div
                            className={`item rounded-md overflow-hidden cursor-pointer group ${
                              sliderIndex === index
                                ? "opacity-100"
                                : "opacity-40"
                            }`}
                            onClick={() => goto(index)}
                          >
                            <img
                              className="w-full h-[60px] object-cover"
                              src={item}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                <div className="zoom-wrap w-[85%]">
                  <Swiper
                    onSwiper={setSwiperBig}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={false}
                  >
                    {product?.images?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <InnerImageZoom
                            className="rounded-lg w-full max-h-[350px] bg-no-repeat overflow-hidden object-cover"
                            src={item}
                            zoomType="hover"
                            zoomScale={1}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-[60%]">
          <h2 className="text-[20px] font-semibold">{product?.name}</h2>

          <div className="flex items-center gap-3 text-gray-500 mt-2">
            <span className="text-[15px]">
              Thương hiệu:{" "}
              <span className="text-[14px] font-[600]">{product?.brand}</span>
            </span>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <span className="text-gray-600 text-[15px]">Danh mục: </span>
            <span className="text-gray-600 text-[15px]">
              {product?.catName}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-4">
            <span className="text-gray-400 text-[15px] line-through">
              {product?.oldPrice}
            </span>
            <span className="text-[17px] text-[#ff5252] font-bold">
              {product?.price}
            </span>
          </div>
          <span className="text-gray-500 text-[15px] font-medium">
            Số lượng: <b className="text-[14px]">{product?.countInStock}</b>
          </span>

          <div className="flex items-center gap-4">
            {typeof product?.rating === "number" && (
              <div className="flex items-center gap-4">
                <span className="mt-1">
                  <Rating
                    name="size-small"
                    value={product.rating}
                    size="small"
                    readOnly
                  />
                </span>
              </div>
            )}
            {product?.reviews?.length > 0 ? (
              <>
                <span className="text-[14px]">
                  Nhận xét: ({product?.reviews?.length})
                </span>
              </>
            ) : (
              <>
                <span className="text-[14px]">Nhận xét: 0</span>
              </>
            )}
          </div>

          <span className="text-gray-500 text-[15px] font-medium">
            Ngày tạo:{" "}
            <b className="text-[14px]">
              {new Date(product?.createdAt).toLocaleDateString("vi-VN")}
            </b>
          </span>

          {product?.description !== 0 ? (
            <>
              <p className="text-black/80 mt-2 text-[16px] font-semibold">
                Mô tả:{" "}
                <div className="!font-[400] !text-[14px]">
                  {product?.description}
                </div>
              </p>
            </>
          ) : (
            ""
          )}

          {product?.productFlavor?.length !== 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[14px] text-gray-600">Hương vị:</span>
              {product?.productFlavor?.map((flavor, index) => {
                return (
                  <div key={index} className="text-[14px]">
                    {flavor}
                    {index !== product.productFlavor.length - 1 && ","}
                  </div>
                );
              })}
            </div>
          )}

          {product?.productWeight?.length !== 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[14px] text-gray-600">Cân nặng:</span>
              {product?.productWeight?.map((weight, index) => {
                return (
                  <div key={index} className="text-[14px]">
                    {weight}
                    {index !== product.productWeight.length - 1 && ","}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

        <div className="customer-reviews">
            <div className="w-full px-5 flex justify-between !mt-4 items-center">
                <h2 className="text-[18px] font-bold">Nhận xét của khách hàng</h2>
            </div>
            <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
                <div className="review pb-5 border-b w-full flex items-center justify-between mt-6">
                <div className="info w-[70%] flex items-center gap-3">
                    <div className="img w-[70px] h-[70px] !min-w-[70px] overflow-hidden rounded-full">
                    <img
                        className="w-full h-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm4Cp0JO-s03hFKGZ2WgyO4luH1JSSzcB0ZA&s"
                    />
                    </div>

                    <div className="w-[100%]">
                    <h4 className="text-[15px] font-[600]">Nina</h4>
                    <h5 className="text-[12px] font-[500]">22-03-2025</h5>
                    <p className="text-[13px] font-[400] mt-0 mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Doloremque voluptatibus consequatur ab saepe perferendis nihil
                        vero suscipit! Placeat ullam at doloremque animi tenetur ab
                        ducimus, natus nam eos veniam eveniet.
                    </p>
                    </div>
                </div>
                <Rating
                    name="size-small"
                    defaultValue={1}
                    size="small"
                    className="mt-3"
                    readOnly
                />
                </div>
            </div>
        </div>
      
    </section>
  );
};

export default ProductDetails;
