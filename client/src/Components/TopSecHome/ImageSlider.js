import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./ImageSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = ({ slider, loop, text }) => {
  const imageList = document.querySelector(".custom-image-wrapper");

  const clickHandler = (direction) => {
    const scrollAmount = imageList.clientWidth * direction;
    imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="custom-image-slider">
      <div className="custom-image-wrapper">
        <button
          className="custom-coursel-btn coursel-left"
          onClick={() => clickHandler(-1)}
        >
          {"<"}
        </button>
        {/* <div className=""> */}
        {slider?.map((item, index) => (
          <div className="custom-image-card" key={index}>
            <img
              src={require(`./img_1/${item.pic}`)}
              alt={item.pic}
              className="card-img"
            />
            {/* <div className="text-content">
              <div className="text-inner-content"></div>
              <div className="text-inner-content"></div>
              <div className="text-inner-content"></div>
            </div> */}
          </div>
        ))}

        <button
          className="custom-coursel-btn coursel-right"
          onClick={() => clickHandler(1)}
        >
          {">"}
        </button>
      </div>

      <div className="custom-slider-scrollbar">
        <div className="custom-scrollbar-track">
          <div className="custom-scrollbar-thumb"></div>
        </div>
      </div>
    </div>
    // <Swiper
    //   slidesPerView={6}
    //   navigation
    //   spaceBetween={10}
    //   modules={[Autoplay, Pagination, Navigation]}
    //   className="slide-container"
    //   autoplay={loop && { delay: 2500 }}
    // >
    //   {slider.map((val, i) => {
    //     return (
    //       <SwiperSlide key={i}>
    //         <div className="slide-content">
    //           <div className="card-wrapper swiper-wrapper">
    //             <Link
    //               to={{
    //                 pathname: `/product/${val._id}`,
    //               }}
    //             >
    //               <div className="card swiper-slide">
    //                 <div className="image-content">
    //                   <div className="card-image">
    //                     <img
    //                       src={require(`./img_1/${val.pic}`)}
    //                       alt={val.pic}
    //                       className="card-img"
    //                     />
    //                   </div>
    //                 </div>
    //                 {text && (
    //                   <div className="card-content">
    //                     <div className="main-head">
    //                       <span className="offer-tag">{val.offerTag}</span>
    //                       &nbsp;
    //                       <p className="deal-details">{val.dealDetails}</p>
    //                     </div>
    //                     <p className="item-name">{val.itemName}</p>
    //                   </div>
    //                 )}
    //               </div>
    //             </Link>
    //           </div>
    //         </div>
    //       </SwiperSlide>
    //     );
    //   })}
    // </Swiper>
  );
};

export default ImageSlider;
