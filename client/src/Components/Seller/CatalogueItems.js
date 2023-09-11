import React, { useState } from "react";
import "./CatalogueItems.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetail from "./Modal/ProductDetail";
import QuantityModal from "./Modal/QuantityModal";

const CatalogueItems = ({
  id,
  name,
  category,
  price,
  MRP,
  model,
  description,
  brand,
  pics,
  quantity,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuantityModalOpen, setQuantityModalOpen] = useState(false);
console.log('');  const openProductDetailModal = (product) => {
    setSelectedProduct(product);
  };
console.log(id);
  const closeProductDetailModal = () => {
    setSelectedProduct(null);
  };


  const openQuantityModal = () => {
    setQuantityModalOpen(true);
  };

  const closeQuantityModal = () => {
    setQuantityModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    accessibility: true,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="CatalogueOuter">
        <div className="CatalogueItemMainContainer">
          <div className="CatalogueItemImageContainer">
            <Slider {...settings}>
              {pics.map((pic, index) => (
                <div key={index}>
                  <img
                    src={`${process.env.REACT_APP_AWS_LINK}${pic}`}
                    alt={name}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Name: <span> {name} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              Category:<span> {category} </span>
            </p>
          </div>
          <div className="CatalogueItemProductDetails">
            <p>
              <div>
                <button onClick={openQuantityModal}>
                  <span>Add More Products</span>
                </button>
                <button
                  onClick={() =>
                    openProductDetailModal({
                      name,
                      category,
                      price,
                      MRP,
                      model,
                      description,
                      brand,
                      pics,
                      quantity,
                    })
                  }
                >
                  <span>view full details</span>
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductDetail {...selectedProduct} onClose={closeProductDetailModal} />
      )}
      {isQuantityModalOpen && (
        <QuantityModal
          quantity={quantity}
          id={id}
          onClose={closeQuantityModal}
        />
      )}
    </>
  );
};

export default CatalogueItems;
