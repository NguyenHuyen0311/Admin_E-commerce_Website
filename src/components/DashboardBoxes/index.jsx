import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaUsers } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FiBarChart2 } from "react-icons/fi";
import { IoGift } from "react-icons/io5";
import { RiProductHuntFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";

const DashboardBoxes = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className='box p-4 bg-[#41b153] rounded-md border flex gap-2 items-center justify-between'>
            <FaUsers className='text-[30px] !min-w-[30px] w-[20%] text-white' />
            <div className='info w-[60%] text-white'>
                <h3>Số lượng người dùng</h3>
                <b className='text-[20px]'>10</b>
            </div>
            <IoStatsChartSharp className='text-[30px] !min-w-[30px] w-[20%] text-white' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box p-4 bg-[#5664e7] rounded-md border flex items-center justify-between gap-2'>
            <IoGift className='text-[30px] !min-w-[30px] w-[20%] text-white' />
            <div className='info w-[60%] text-white'>
                <h3>Số lượng đơn hàng</h3>
                <b className='text-[20px]'>100</b>
            </div>
            <FaChartPie className='text-[30px] !min-w-[30px] w-[20%] text-white' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box p-4 bg-[#d459a1] rounded-md border flex items-center justify-between gap-2'>
            <RiProductHuntFill className='text-[30px] !min-w-[30px] w-[20%] text-white' />
            <div className='info w-[60%] text-white'>
                <h3>Số lượng sản phẩm</h3>
                <b className='text-[20px]'>80</b>
            </div>
            <FaChartLine className='text-[30px] !min-w-[30px] w-[20%] text-white' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box p-4 bg-[#f09540] rounded-md border flex items-center justify-between gap-2'>
            <MdCategory className='text-[30px] !min-w-[30px] w-[20%] text-white' />
            <div className='info w-[60%] text-white'>
                <h3>Số lượng danh mục</h3>
                <b className='text-[20px]'>25</b>
            </div>
            <FiBarChart2 className='text-[30px] !min-w-[30px] w-[20%] text-white' />
          </div>
        </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default DashboardBoxes;