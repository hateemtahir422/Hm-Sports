import { Product } from "../data";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark blur backdrop */}
      <div 
        className="absolute inset-0 bg-pitchgreen-dark/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-pitchgreen-dark border-l border-pitchgreen-light/60 flex flex-col justify-between shadow-2xl animate-slideOver">
          {/* Header */}
          <div className="px-6 py-6 border-b border-pitchgreen-light/50 flex items-center justify-between">
            <h2 className="text-xl font-display font-black text-white tracking-wider flex items-center space-x-2">
              <ShoppingBag className="h-5.5 w-5.5 text-limeaccent" />
              <span>YOUR CART</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-gray-400 hover:text-white hover:bg-pitchgreen transition-all"
              aria-label="Close cart drawer"
            >
              <X className="h-5.5 w-5.5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 divide-y divide-pitchgreen-light/30 scrollbar-thin">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
                <div className="bg-pitchgreen p-6 rounded-full border border-pitchgreen-light/50">
                  <ShoppingBag className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-white font-display text-lg font-bold">Your cart is empty</h3>
                <p className="text-gray-400 text-sm max-w-xs font-sans">
                  Recover faster and level up your training by adding items to your cart!
                </p>
                <button
                  onClick={onClose}
                  className="bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-bold text-sm py-3 px-6 rounded-xl transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const discountPercent = Math.round(
                  ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
                );
                return (
                  <div 
                    key={item.product.id} 
                    className={`flex py-4 gap-4 items-start ${index === 0 ? "" : "border-t border-pitchgreen-light/20"}`}
                  >
                    {/* Tiny Picture representation */}
                    <div className="relative h-20 w-20 flex-shrink-0 bg-pitchgreen rounded-xl overflow-hidden border border-pitchgreen-light/40">
                      <picture className="w-full h-full block">
                        <source media="(max-width: 640px)" srcSet={item.product.images.mobile} />
                        <img 
                          src={item.product.images.desktop} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </picture>
                    </div>

                    {/* Meta info & Quantity control */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-display font-bold text-white tracking-tight line-clamp-1 pr-2">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-500 hover:text-red-500 p-1 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-xs text-limeaccent font-sans font-medium">
                          Save {discountPercent}%
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-2.5">
                        {/* Quantity picker */}
                        <div className="flex items-center space-x-2 border border-pitchgreen-light bg-pitchgreen-light/10 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 text-gray-400 hover:text-white hover:bg-pitchgreen rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold text-white w-5 text-center font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 text-gray-400 hover:text-white hover:bg-pitchgreen rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-white font-sans font-bold text-sm">
                            Rs. {(item.product.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-gray-500 text-[10px] font-sans">
                            (Rs. {item.product.price.toLocaleString()} each)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Checkout Footer block */}
          {cartItems.length > 0 && (
            <div className="border-t border-pitchgreen-light/50 px-6 py-6 bg-pitchgreen/60 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400 text-sm font-display font-medium uppercase tracking-wider">Subtotal</span>
                <span className="text-limeaccent font-sans text-2xl font-black">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-normal font-sans">
                🚚 Nationwide Cash on Delivery (COD) is absolutely <strong className="text-white">FREE</strong> for your order. No hidden charges.
              </p>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center space-x-2 bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-black text-sm uppercase tracking-wider py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-limeaccent/10 active:scale-[0.99]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full text-center text-xs text-gray-400 hover:text-white underline font-medium py-1 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
