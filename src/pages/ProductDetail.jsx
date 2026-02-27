import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">Producto no encontrado</h2>
        <Link to="/shop" className="text-primary hover:underline">Volver a la tienda</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-primary">Tienda</Link>
            <span className="text-gray-400">/</span>
            <span className="text-secondary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.featured && (
                <span className="absolute top-4 left-4 bg-primary text-white text-sm px-4 py-1 rounded-full font-medium">
                  Destacado
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-gray-500 uppercase text-sm mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4 font-montserrat">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-gray-600 mb-8 font-poppins leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Categoría: {product.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Género: {product.gender}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar al Carrito
                </button>
                <Link
                  to="/shop"
                  className="px-8 py-4 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-colors"
                >
                  Volver
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <svg className="w-6 h-6 mx-auto text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                    </svg>
                    <p className="text-xs text-gray-500">Envío Gratis</p>
                  </div>
                  <div>
                    <svg className="w-6 h-6 mx-auto text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <p className="text-xs text-gray-500">Devolución 30 días</p>
                  </div>
                  <div>
                    <svg className="w-6 h-6 mx-auto text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <p className="text-xs text-gray-500">Compra Segura</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-8 font-montserrat">
              Productos <span className="text-primary">Relacionados</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
