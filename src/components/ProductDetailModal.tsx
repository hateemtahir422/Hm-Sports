import { useState, useEffect } from "react";
import { Product } from "../data";
import { Star, Plus, Minus, ShoppingCart, X, Shield, RefreshCw, Truck } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens for a new product
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-pitchgreen-dark/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-pitchgreen-dark border border-pitchgreen-light/80 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl z-10 animate-scaleIn scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-pitchgreen hover:bg-pitchgreen-light text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-200"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Column 1: Image Frame */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-pitchgreen overflow-hidden rounded-xl border border-pitchgreen-light/40">
              <picture className="w-full h-full block">
                {/* Mobile Crop */}
                <source 
                  media="(max-width: 640px)" 
                  srcSet={product.images.mobile} 
                />
                {/* Desktop Landscape Crop */}
                <img 
                  src={product.images.desktop} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </picture>
              <span className="absolute top-3 left-3 bg-limeaccent text-pitchgreen-dark font-sans font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                {product.badge || "Featured"}
              </span>
            </div>

            {/* Quick Guarantees Badge Group */}
            <div className="grid grid-cols-3 gap-2 bg-pitchgreen-light/30 border border-pitchgreen-light/40 rounded-xl p-3 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-4 w-4 text-limeaccent mb-1" />
                <span className="text-[10px] text-gray-300 font-sans font-medium">Free COD Delivery</span>
              </div>
              <div className="flex flex-col items-center border-x border-pitchgreen-light/30">
                <RefreshCw className="h-4 w-4 text-limeaccent mb-1" />
                <span className="text-[10px] text-gray-300 font-sans font-medium">7-Day Return</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-4 w-4 text-limeaccent mb-1" />
                <span className="text-[10px] text-gray-300 font-sans font-medium">100% Original</span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Specs & Ordering info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {product.name}
              </h2>

              {/* Star Rating & Review count */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4.5 w-4.5 fill-current ${
                        i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-600"
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300 font-sans">
                  {product.rating} <span className="text-gray-500">|</span> {product.reviewCount} Verified Buyer Reviews
                </span>
              </div>

              {/* Price Tag with discount percentage */}
              <div className="flex items-baseline space-x-3.5 mb-6 bg-pitchgreen-light/20 p-4 rounded-xl border border-pitchgreen-light/30">
                <span className="text-limeaccent font-sans text-3xl font-black">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-gray-500 font-sans text-lg line-through decoration-gray-500">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white font-sans font-semibold text-xs px-2.5 py-0.5 rounded-full">
                  -{discountPercent}% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="mb-6">
                <h4 className="text-white font-display text-sm font-bold tracking-wider uppercase mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-300 font-sans">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-limeaccent mr-2.5">✔</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Table */}
              <div className="mb-6">
                <h4 className="text-white font-display text-sm font-bold tracking-wider uppercase mb-3">
                  Technical Specifications
                </h4>
                <div className="bg-pitchgreen border border-pitchgreen-light/40 rounded-xl overflow-hidden">
                  {Object.entries(product.specs).map(([key, val], index) => (
                    <div 
                      key={key} 
                      className={`grid grid-cols-2 gap-4 px-4 py-2.5 text-xs ${
                        index % 2 === 0 ? "bg-pitchgreen-light/10" : "bg-transparent"
                      } border-b border-pitchgreen-light/20 last:border-0`}
                    >
                      <span className="text-gray-400 font-medium font-sans uppercase tracking-wider">{key}</span>
                      <span className="text-white font-sans font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action Panel */}
            <div className="border-t border-pitchgreen-light/40 pt-6 mt-6 flex flex-col sm:flex-row gap-4">
              {/* Quantity Changer */}
              <div className="flex items-center justify-between border border-pitchgreen-light bg-pitchgreen-light/20 rounded-xl p-1.5 w-full sm:w-36">
                <button
                  onClick={handleDecrease}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-pitchgreen transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-sans font-bold text-white text-base px-2">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-pitchgreen transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="flex-grow flex items-center justify-center space-x-2 bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-limeaccent/10 active:scale-[0.99]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add {quantity} to Cart — Rs. {(product.price * quantity).toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
