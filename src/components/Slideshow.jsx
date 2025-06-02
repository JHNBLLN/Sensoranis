import React, { useState, useEffect } from "react";
import "./css/Slideshow.css";
import Slide1 from "../assets/slideimg/slideshow1.jpg";
import Slide2 from "../assets/slideimg/slideshow2.png";
import Slide3 from "../assets/slideimg/slideshow3.png";

const images = [Slide1, Slide2, Slide3];

function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((src, index) => (
        <div
          className={`slide ${index === current ? "active" : ""}`}
          key={index}
        >
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Slideshow;
