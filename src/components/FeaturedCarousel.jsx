import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCarousel = ({ products, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const carouselRef = useRef(null);

  const totalSlides = products.length;

  // Autoplay - cada 5 segundos
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplayEnabled, totalSlides]);

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoplayEnabled(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      } else {
        // Swipe right - prev
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setAutoplayEnabled(true);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoplayEnabled(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      } else {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setAutoplayEnabled(true);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 5000);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                        Destacado
                      </span>
                    )}
                  </div>
                </Link>
                
                <div className="p-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm sm:text-base text-secondary mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-primary w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => {
          setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
          setAutoplayEnabled(false);
          setTimeout(() => setAutoplayEnabled(true), 5000);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 hidden sm:block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => {
          setCurrentIndex((prev) => (prev + 1) % totalSlides);
          setAutoplayEnabled(false);
          setTimeout(() => setAutoplayEnabled(true), 5000);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 hidden sm:block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default FeaturedCarousel;
