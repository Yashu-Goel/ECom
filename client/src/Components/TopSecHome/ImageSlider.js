import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./ImageSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = ({ slider, loop, text }) => {
  return (
    <Swiper
      slidesPerView={6}
      navigation
      spaceBetween={10}
      modules={[Autoplay, Pagination, Navigation]}
      className="slide-container"
      autoplay={loop && { delay: 2500 }}
    >
      {slider.map((val, i) => {
        return (
          <SwiperSlide key={i}>
            <div className="slide-content">
              <div className="card-wrapper swiper-wrapper">
                <Link
                  to={{
                    pathname: `/product/${val.link}`,
                  }}
                >
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
                    {text && (
                      <div className="card-content">
                        <div className="main-head">
                          <span className="offer-tag">{val.offerTag}</span>
                          &nbsp;
                          <p className="deal-details">{val.dealDetails}</p>
                        </div>
                        <p className="item-name">{val.itemName}</p>
                      </div>
                    )}
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
