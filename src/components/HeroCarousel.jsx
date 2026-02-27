import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=800&fit=crop",
    title: "Rendimiento sin límites",
    subtitle: "Nueva colección 2026",
    description: "Equípate con la mejor tecnología deportiva",
    cta: "Ver Tienda"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=800&fit=crop",
    title: "Mujeres en movimiento",
    subtitle: "Colección FemFit",
    description: "Diseño y comodidad para tu entrenamiento",
    cta: "Explorar"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1600&h=800&fit=crop",
    title: "Supreme Quality",
    subtitle: "Premium Sportswear",
    description: "Calidad premium para atletas exigentes",
    cta: "Comprar Ahora"
  }
];

const HeroCarousel = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <p className="text-primary font-medium mb-2 tracking-wider">{slide.subtitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-200 text-lg mb-8">{slide.description}</p>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
