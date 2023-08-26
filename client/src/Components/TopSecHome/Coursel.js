import React, { useState } from "react";
import "./Coursel.css";

const Coursel = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4091975/pexels-photo-4091975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const imageSlides = document.getElementsByClassName("slide-image");
  const bubbles = document.getElementsByClassName("bubble-outer");
  const nextImage = () => {
    let newIndex = current === images.length - 1 ? 0 : current + 1;
    imageSlides[current].className = "slide-image leftOut";
    imageSlides[newIndex].className = "slide-image leftIn";
    updateBubbles(newIndex);
    setCurrent(newIndex);
  };
  const prevImage = () => {
    let newIndex = current === 0 ? images.length - 1 : current - 1;
    imageSlides[current].className = "slide-image rightOut";
    imageSlides[newIndex].className = "slide-image rightIn";
    updateBubbles(newIndex);
    setCurrent(newIndex);
  };
  const jumpImage = (e) => {
    let jumpIndex = parseInt(e.target.id);
    if (jumpIndex === current) return;
    if (jumpIndex - current >= 0) {
      imageSlides[current].className = "slide-image leftOut";
      imageSlides[jumpIndex].className = "slide-image leftIn";
    } else {
      imageSlides[current].className = "slide-image rightOut";
      imageSlides[jumpIndex].className = "slide-image rightIn";
    }
    updateBubbles(jumpIndex);
    setCurrent(jumpIndex);
  };
  const updateBubbles = (highlight) => {
    bubbles[current].style.borderColor = "black";
    bubbles[highlight].style.borderColor = "white";
  };
  React.useEffect(() => {
    bubbles[current].style.borderColor = "white";
  }, []);
  return (
    <>
      <div className="outer-coursel">
        <button className="button-prev" onClick={prevImage}>
          {"<"}
        </button>

        <div className="gallery-container">
          <div className="gallery-track">
            {images.map((image, index) => {
              return (
                <div
                  className="slide-image"
                  style={
                    index === 0
                      ? {
                          backgroundImage: `url(${image})`,
                          transform: "translateX(0%)",
                        }
                      : {
                          backgroundImage: `url(${image})`,
                          transform: "translateX(100%)",
                        }
                  }
                ></div>
              );
            })}
          </div>
        </div>
        <div className="gallery-footer">
          {images.map((_, index) => {
            return (
              <div className="bubble-outer" onClick={jumpImage} id={index}>
                <div className="bubble-inner" id={index}></div>
              </div>
            );
          })}
        </div>
        <button className="button-next" onClick={nextImage}>
          {">"}
        </button>
      </div>
    </>
  );
};
export default Coursel;
