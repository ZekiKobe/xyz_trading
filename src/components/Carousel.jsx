import React, { useState, useEffect } from "react";

const images = [
  "/src/assets/img1.jpg",
  "/src/assets/img2.jpg",
  "/src/assets/img3.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-64 bg-gray-800 flex justify-center items-center">
      <button onClick={prevSlide} className="absolute left-4 bg-white text-black p-2 rounded">←</button>
      <img src={images[current]} alt="Crypto" className="w-full h-64 object-cover transition-opacity duration-500 ease-in-out" />
      <button onClick={nextSlide} className="absolute right-4 bg-white text-black p-2 rounded">→</button>
    </div>
  );
};

export default Carousel;
