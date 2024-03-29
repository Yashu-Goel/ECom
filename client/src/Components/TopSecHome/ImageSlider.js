import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./ImageSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = ({ slider, loop, text }) => {
  const [swiperConfig, setSwiperConfig] = useState({
    slidesPerView: 5,
    spaceBetween: 10,
    width: 1200,
  });
  const [screenWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window?.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (screenWidth <= 768) {
        setSwiperConfig({
          slidesPerView: 6,
          spaceBetween: 0,
          width: 1200,
        });
      } else if (screenWidth <= 992) {
        setSwiperConfig({
          slidesPerView: 6,
          spaceBetween: 10,
          width: 1200,
        });
      } else if (screenWidth <= 1200) {
        setSwiperConfig({
          slidesPerView: 5,
          spaceBetween: 10,
          width: 1200,
        });
      } else {
        setSwiperConfig({
          slidesPerView: 5,
          spaceBetween: 10,
          width: 1200,
        });
      }
    };
    handleResize();
  }, [screenWidth]);
  return (
    <Swiper
      {...swiperConfig}
      navigation
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
                    pathname: `/product/${val._id}`,
                  }}
                >
                  <div className="card swiper-slide">
                    <div className="card-image">
                      <img
                        src={require(`./img_1/${val.pic}`)}
                        alt={val.pic}
                        className="card-img"
                      />
                    </div>
                    {text && (
                      <div className="main-head">
                        <p id="offer-tag">{val.offerTag}</p>
                        &nbsp;
                        <p id="deal-details">{val.dealDetails}</p>
                        <p id="item-name">{val.itemName}</p>
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
