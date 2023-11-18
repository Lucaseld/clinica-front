import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import "./Menu.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Home from "../Home/Home";

export default function Menu() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        // navigation={true}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="img1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="img2"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="img3"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="img4"/>
        </SwiperSlide>
      </Swiper>
      <Home />
    </>
  );
}
