import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./ImageSlider.css";
import firstSlider from "../dummyDatas/firstSlider.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <Swiper
      slidesPerView={7}
      navigation
      spaceBetween={10}
      modules={[Autoplay, Pagination, Navigation]}
      className="slide-container"
      autoplay={{ delay: 2500 }}
    >
      {firstSlider.map((val, i) => {
        return (
          <SwiperSlide key={i}>
            <div className="slide-content">
              <div className="card-wrapper swiper-wrapper">
                <Link to={val.link}>
                  <div className="card swiper-slide">
                    <div className="image-content">
                      <div className="card-image">
                        <img
                          src={require(`./img_1/${val.pic}`)}
                          alt={val.pic}
                          className="card-img"
                        />
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="main-head">
                        <span className="offer-tag">{val.offerTag}</span>
                        &nbsp;
                        <p className="deal-details">{val.dealDetails}</p>
                      </div>
                      <p className="item-name">{val.itemName}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
