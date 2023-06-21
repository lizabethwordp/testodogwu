/* istanbul ignore file */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";
import pic1 from './assets/1932042689-shutterstock-1932042690.jpg';
import pic2 from './assets/banking-technology-concept-cropped.jpg';
import pic3 from './assets/photo-1573164574572-cb89e39749b4.jpg';

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Sliding() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={pic1} alt="..." /></SwiperSlide>
        <SwiperSlide><img src={pic2} alt="..." /></SwiperSlide>
        <SwiperSlide><img src={pic3} alt="..." /></SwiperSlide>
      </Swiper>
    </>
  );
}