import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks
import { PIZZA_ADD_ON } from "../constants"; 
import AddOnModal from "./AddOnModal"; 

// ─────────────────────────────────────────────────────────────────
// 🔒 ONLINE ORDERING FLAG — set to true to re-enable online orders
const ONLINE_ORDERING_ENABLED = false;
// ─────────────────────────────────────────────────────────────────

const DishCard = ({ dish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get user status
  const navigate = useNavigate();
  const location = useLocation();

  // Availability Check
  const isAvailable = dish?.isInStock;

  // --- HELPER: Redirect if not logged in ---
  const checkLoginAndRedirect = () => {
    if (!user) {
      // 🚀 Redirect to /login, saving the current page in state
      navigate('/auth', { state: { from: location } });
      return false;
    }
    return true;
  };

  // --- LOGIC: Check for Pizza ---
  const handleOrderClick = () => {
    // 🔒 Online ordering disabled — show coming soon popup
    if (!ONLINE_ORDERING_ENABLED) {
      setShowComingSoon(true);
      return;
    }

    if (!checkLoginAndRedirect()) return; // Stop if not logged in

    // Check category or title
    const isPizza = 
      (dish.category === "Pizza") || 
      (dish.title && dish.title.toLowerCase().includes("pizza"));

    if (isPizza) {
      setIsModalOpen(true);
    } else {
      addToCart(dish);
    }
  };

  const handleAddBasic = () => {
    if (!checkLoginAndRedirect()) return;
    addToCart(dish);
    setIsModalOpen(false);
  };

  // --- LOGIC: Add 2 SEPARATE items ---
  const handleAddWithAddOn = () => {
    if (!checkLoginAndRedirect()) return;

    // 1. Add the Pizza as usual
    addToCart(dish); 

    // 2. Add the Cheese as a SEPARATE item
    addToCart({
      ...PIZZA_ADD_ON,
      title: `Extra Cheese (${dish.title})`, 
      image: PIZZA_ADD_ON.image,
      price: PIZZA_ADD_ON.price
    });
    
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`
          group rounded-3xl shadow-xl p-6 flex flex-col items-center min-h-[400px]
          bg-black/20 backdrop-blur-lg border border-white/20
          transition-all duration-300 ease-out 
          hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
          ${!isAvailable ? 'opacity-60 grayscale' : ''} 
        `}
      >
        <div className="h-40 w-40 mb-6 rounded-2xl shadow-md overflow-hidden relative">
          <img
            src={dish.image}
            alt={dish.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/27272a/737373?text=Image+Missing';
            }}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold border border-white px-2 py-1 rounded">SOLD OUT</span>
            </div>
          )}
        </div>

        <h3 className="mb-2 text-2xl font-bold text-white text-center leading-tight">
          {dish.title}
        </h3>

        <p className="mb-4 text-base text-gray-200 text-center flex-grow line-clamp-3">
          {dish.description}
        </p>

        <span className="mb-6 text-2xl font-extrabold text-primary block">
          {dish.price?.toString().includes('₹') ? dish.price : `₹${dish.price}`}
        </span>

        <div className="relative w-full flex justify-center mt-auto">
          <button
            className={`
              px-8 py-3 rounded-full font-bold text-lg shadow-lg 
              transition-all duration-200 ease-out
              ${isAvailable
                ? 'bg-primary text-white hover:bg-rose-600 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
            onClick={handleOrderClick}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* ── Coming Soon Modal (shown when ONLINE_ORDERING_ENABLED = false) ── */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: '3rem' }}>🚫</div>
            <h2 className="text-2xl font-bold text-gray-800 mt-3">Online Ordering Disabled</h2>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Online ordering is currently unavailable.<br />
              We'll be back soon — stay tuned! 🍓
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-rose-600 transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <AddOnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={dish}
        addOn={PIZZA_ADD_ON}
        onAddBasic={handleAddBasic}
        onAddWithAddOn={handleAddWithAddOn}
      />
    </>
  );
};

export default DishCard;