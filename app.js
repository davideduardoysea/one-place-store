const { useState, useEffect } = React;

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Datos iniciales de ejemplo
  const [products, setProducts] = useState([
    { id: 1, name: 'Essential Tee', price: 35, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500' },
    { id: 2, name: 'Canvas Backpack', price: 85, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500' }
  ]);

  const addToCart = (p) => {
    setCart([...cart, p]);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tighter uppercase">One Place Store</h1>
        <div className="flex gap-6 items-center">
          <button onClick={() => setIsAdmin(!isAdmin)} className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black">
            {isAdmin ? 'Volver a Tienda' : 'Admin'}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <i data-lucide="shopping-bag"></i>
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-24">
        {isAdmin ? (
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>
            <div className="grid gap-8">
              <div className="border p-6 rounded-lg bg-gray-50">
                <h3 className="font-bold mb-4 uppercase text-sm">Agregar Producto</h3>
                <input type="text" placeholder="Nombre" className="w-full mb-2 p-2 border" />
                <input type="number" placeholder="Precio" className="w-full mb-2 p-2 border" />
                <button className="w-full bg-black text-white py-2 text-sm font-bold uppercase">Publicar</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                  <img src={p.image} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                  <button onClick={() => addToCart(p)} className="absolute bottom-4 left-4 right-4 bg-white py-3 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 uppercase">
                    Añadir
                  </button>
                </div>
                <h3 className="text-sm font-medium">{p.name}</h3>
                <p className="text-gray-500">${p.price}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CARRITO SIDEBAR */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-[60] p-8 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between mb-8">
          <h2 className="font-bold uppercase tracking-widest">Tu Bolsa</h2>
          <button onClick={() => setIsCartOpen(false)}><i data-lucide="x"></i></button>
        </div>
        {cart.map((item, i) => (
          <div key={i} className="flex gap-4 mb-4 border-b pb-4">
            <img src={item.image} className="w-16 h-20 object-cover" />
            <div>
              <p className="text-xs font-bold">{item.name}</p>
              <p className="text-xs text-gray-500">${item.price}</p>
            </div>
          </div>
        ))}
        <button className="w-full bg-black text-white py-4 mt-4 text-xs font-bold tracking-widest">CHECKOUT — ${cart.reduce((a, b) => a + b.price, 0)}</button>
      </div>
    </div>
  );
};

// Renderizar la App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

// Inicializar iconos de Lucide después del render
setTimeout(() => lucide.createIcons(), 500);
