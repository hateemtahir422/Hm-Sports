import React from "react";
import { Product } from "../data";
import { Star, Eye, ShoppingCart, MessageCircle } from "lucide-react";

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}: ProductCardProps) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between bg-pitchgreen-light/40 border border-pitchgreen-light/60 hover:border-limeaccent/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(11,61,46,0.3)]"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="bg-limeaccent text-pitchgreen-dark font-sans font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
            {product.badge}
          </span>
        )}
        <span className="bg-red-500 text-white font-sans font-bold text-xs px-3 py-1 rounded-full shadow-md tracking-wider">
          Save {discountPercent}%
        </span>
      </div>

      {/* Product Image - HTML <picture> with Mobile (portrait) and Desktop (landscape) Media Sources */}
      <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-pitchgreen-dark/80 cursor-pointer" onClick={() => onViewDetails(product)}>
        <picture className="w-full h-full block">
          {/* Mobile version: Tighter Portrait Crop */}
          <source 
            media="(max-width: 640px)" 
            srcSet={product.images.mobile} 
          />
          {/* Desktop version: Default Landscape Lifestyle Widescreen */}
          <img 
            src={product.images.desktop} 
            alt={product.name} 
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-pitchgreen-dark via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Rating Stars */}
          <div className="flex items-center space-x-1.5 mb-2.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 fill-current ${
                    i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-600"
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-sans font-medium">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product)} 
            className="text-white hover:text-limeaccent font-display text-lg font-bold tracking-tight mb-2.5 transition-colors duration-200 cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short description bullet */}
          <p className="text-gray-400 font-sans text-xs line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Prices Section */}
          <div className="flex items-baseline space-x-3 mb-4.5">
            <span className="text-limeaccent font-sans text-2xl font-black tracking-tight">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-gray-500 font-sans text-sm line-through decoration-gray-500">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-pitchgreen-light/40">
            {/* View Button */}
            <button
              onClick={() => onViewDetails(product)}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl border border-pitchgreen-light hover:border-limeaccent/60 text-gray-300 hover:text-white hover:bg-pitchgreen-light/40 transition-all duration-200 text-xs font-semibold"
            >
              <Eye className="h-4 w-4" />
              <span>Details</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-bold text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-limeaccent/10 active:scale-[0.98]"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Direct WhatsApp Call-to-Action */}
          <a
            href={`https://wa.me/923001234567?text=${encodeURIComponent(
              `Assalam-o-Alaikum HM Sports! 🇵🇰 I would like to order "${product.name}" for Rs. ${product.price.toLocaleString()}.\n\nPlease guide me on the checkout details!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
