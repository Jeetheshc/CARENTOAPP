import React, { useState, useEffect } from 'react';

const Carosal = () => {
  const slides = [
    "https://img.freepik.com/free-vector/suv-car-concept-illustration_114360-13226.jpg?t=st=1732294261~exp=1732297861~hmac=3a6549b7006700c83d42525810b942293e0811cb46e2f74ef601e328eccd675b&w=740",
    "https://img.freepik.com/free-vector/electric-car-concept-illustration_114360-927.jpg?t=st=1732294359~exp=1732297959~hmac=c15a0fe7b4440882d09396660204c92d61f109bc14ca28c860423611f9624fa4&w=740",
    "https://img.freepik.com/free-vector/modern-urban-adventure-suv-vehicle-illustration_1344-200.jpg?t=st=1732294413~exp=1732298013~hmac=d5eb376f0e98e7f78c2fdaa7ad4ba46c2d78117d169f9f95097d0204fe5c464f&w=740",
    "https://img.freepik.com/free-vector/blue-mpv-minivan-automobile-vector_53876-67351.jpg?t=st=1732294440~exp=1732298040~hmac=7bedcb0a6697ebdddfd2092b2ee35218a6e75cc73ab098ec03cdd9539990601f&w=740",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically transition slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="bg-base-100 text-base-content flex justify-center mt-6">
      <div className="relative w-full max-w-4xl shadow-lg rounded-lg h-[250px] overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            className="btn btn-circle bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
          >
            ❮
          </button>
          <button
            className="btn btn-circle bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
          >
            ❯
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'} transition duration-300`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carosal;
