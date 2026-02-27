import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestra <span className="text-primary">Empresa</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conoce la historia y los valores que nos impulsan a ser líderes en el mundo del deporte
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Nuestra <span className="text-primary">Historia</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Miguel Sports nació en 2021 con una visión clara: democratizar el acceso a ropa 
                  deportiva de alta calidad en Venezuela y Latinoamérica.
                </p>
                <p>
                  Lo que comenzó como un pequeño emprendimiento familiar, rápidamente se transformó 
                  en una marca reconocida por su compromiso con la excelencia y la innovación en el 
                  diseño deportivo.
                </p>
                <p>
                  Hoy, después de años de trabajo constante, nos enorgullece servir a miles de 
                  atletas y entusiastas del fitness que confían en nuestra marca para alcanzar 
                  sus metas deportivas.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop"
                alt="Historia Miguel Sports"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Misión</h3>
              <p className="text-gray-600">
                Proporcionar a los atletas y entusiastas del fitness ropa deportiva de la más alta 
                calidad, innovadora y accesible, que potencie su rendimiento y les permita alcanzar 
                sus objetivos con confianza y estilo.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Visión</h3>
              <p className="text-gray-600">
                Ser la marca líder en ropa deportiva en Latinoamérica, reconocida por su calidad 
                premium, diseño innovador y compromiso con el bienestar de nuestros clientes y el 
                medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Nuestros <span className="text-primary">Valores</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
              <p className="text-gray-600">Cada detalle cuenta. Buscamos la perfección en cada producto</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600">Constantemente evolucionamos para ofrecer lo mejor</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
              <p className="text-gray-600">Tu satisfacción es nuestra mayor recompensa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para entrenar con estilo?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Descubre nuestra colección completa de ropa deportiva premium
          </p>
          <Link to="/shop" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ver Tienda
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
