import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Cart = ({ cart, onRemoveFromCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    telefono: '',
    metodoPago: ''
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    // Simular envío
    const pedidoResumen = `
      *Nuevo Pedido - Miguel Sports*
      
      *Cliente:* ${formData.nombre} ${formData.apellido}
      *Email:* ${formData.email}
      *Teléfono:* ${formData.telefono}
      *Dirección:* ${formData.direccion}
      
      *Método de Pago:* ${formData.metodoPago}
      
      *Productos:*
      ${cart.map(item => `- ${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`).join('\n')}
      
      *Total: $${total.toFixed(2)}*
    `;

    // Enviar a WhatsApp
    const whatsappUrl = `https://wa.me/584247808491?text=${encodeURIComponent(pedidoResumen)}`;
    window.open(whatsappUrl, '_blank');
    
    setOrderPlaced(true);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-secondary mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Explora nuestra tienda y encuentra los mejores productos</p>
          <Link to="/shop" className="btn-primary inline-block">
            Ir a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-4">¡Pedido Realizado!</h2>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Se ha enviado un resumen a: <strong>{formData.email}</strong></p>
            </div>
            
            <Link to="/" className="btn-primary inline-block mt-6">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">Carrito de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Productos ({cart.length})</h2>
              </div>
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary">{item.name}</h3>
                      <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Cant: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-semibold text-lg mb-4">Finalizar Pedido</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'transferencia', label: 'Transferencia' },
                      { id: 'efectivo', label: 'Pago en Efectivo' },
                      { id: 'pagomovil', label: 'Pago Móvil' },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'binance', label: 'Binance' }
                    ].map(metodo => (
                      <label key={metodo.id} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${formData.metodoPago === metodo.id ? 'border-primary bg-orange-50' : ''}`}>
                        <input
                          type="radio"
                          name="metodoPago"
                          value={metodo.id}
                          checked={formData.metodoPago === metodo.id}
                          onChange={handleInputChange}
                          className="text-primary"
                        />
                        <span className="text-sm">{metodo.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Realizar Pedido
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
