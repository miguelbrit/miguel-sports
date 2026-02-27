import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories, genders } from '../data/products';

const Shop = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState(200);
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by gender
    if (selectedGender !== 'all') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'unisex');
    }

    // Filter by price
    result = result.filter(p => p.price <= priceRange);

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedGender, priceRange, sortBy]);

  const suggestedProducts = products.filter(p => !p.featured).slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestra <span className="text-primary">Tienda</span>
          </h1>
          <p className="text-gray-300">
            Encuentra el equipamiento perfecto para tu entrenamiento
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className=" shadow-md p-bg-white rounded-lg6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Filtros</h3>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Categoría</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Género</h4>
                  <div className="space-y-2">
                    {genders.map(gender => (
                      <label key={gender.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={selectedGender === gender.id}
                          onChange={() => setSelectedGender(gender.id)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">{gender.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">
                    Precio máximo: ${priceRange}
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$200</span>
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setPriceRange(200);
                    setSortBy('default');
                  }}
                  className="w-full py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort & Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span> productos encontrados
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="default">Ordenar por: Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre: A - Z</option>
                </select>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No se encontraron productos con esos filtros</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setPriceRange(200);
                    }}
                    className="text-primary hover:underline"
                  >
                    Ver todos los productos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary mb-8 text-center">
            Productos <span className="text-primary">Sugeridos</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
