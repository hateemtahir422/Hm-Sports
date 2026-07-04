import React, { useState, useEffect, ComponentType } from "react";
import { PRODUCTS, TESTIMONIALS, BENEFITS, Product } from "./data";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import CheckoutForm from "./components/CheckoutForm";
import FAQSection from "./components/FAQSection";
import LiveMatchBanner from "./components/LiveMatchBanner";
import { 
  Truck, 
  Banknote, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Zap, 
  Dumbbell, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Clock, 
  ShieldCheck as ShieldIcon,
  MessageCircle,
  X,
  Cpu
} from "lucide-react";

// Benefit Icons Mapper
const ICON_MAP: Record<string, ComponentType<any>> = {
  Truck: Truck,
  Banknote: Banknote,
  RotateCcw: RotateCcw,
  ShieldCheck: ShieldCheck
};

export default function App() {
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "gear" | "sports-electronics" | "lifestyle-electronics">("all");

  // User notifications toast state
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false
  });

  // Load cart from localStorage on mount (optional luxury helper)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("hm_sports_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart state from local storage", e);
    }
  }, []);

  // Save cart to localStorage on state changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem("hm_sports_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart state to local storage", e);
    }
  };

  // Toast Helper
  const triggerToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);
    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }

    saveCart(updatedCart);
    triggerToast(`Added ${quantity} x "${product.name}" to your cart!`);
    
    // Auto open cart drawer on add to cart for smoother purchase flow
    setIsCartOpen(true);
    setSelectedProduct(null); // Close modal if open
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updatedCart = cartItems
      .map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    saveCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
    triggerToast("Item removed from your cart.");
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Scroll navigation helper
  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Flow triggers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    // Let the drawer transition finish then scroll down to checkout
    setTimeout(() => {
      handleNavigateToSection("checkout-section");
    }, 300);
  };

  // Locate our flagship massage gun product
  const flagshipProduct = PRODUCTS.find(p => p.id === "massage-gun") || PRODUCTS[0];

  return (
    <div className="bg-pitchgreen-dark min-h-screen text-gray-100 font-sans selection:bg-limeaccent selection:text-pitchgreen-dark overflow-x-hidden">
      
      {/* 0. LIVE MATCH TOP BANNER */}
      <LiveMatchBanner />

      {/* 1. STICKY NAVBAR */}
      <Navbar 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Floaty Notification Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-pitchgreen border-2 border-limeaccent text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center justify-between space-x-3 animate-slideUp">
          <div className="flex items-center space-x-2.5">
            <div className="bg-limeaccent text-pitchgreen-dark p-1.5 rounded-lg">
              <Sparkles className="h-4.5 w-4.5 font-bold" />
            </div>
            <p className="text-xs font-sans font-bold leading-tight">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, show: false }))} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      )}

      {/* 2. HERO SECTION — Flagship massage gun */}
      <header id="hero-section" className="relative pt-8 pb-16 sm:pb-24 lg:pt-14 lg:pb-32 bg-gradient-to-b from-pitchgreen-dark to-pitchgreen/60 overflow-hidden border-b border-pitchgreen-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-pitchgreen-light/40 border border-pitchgreen-light px-3.5 py-1.5 rounded-full text-limeaccent font-mono text-xs uppercase tracking-wider">
                <Zap className="h-4 w-4 animate-bounce" />
                <span>NATIONWIDE FREE SHIPPING & CASH ON DELIVERY</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Recover Faster.<br />
                <span className="text-limeaccent font-extrabold">Train Harder.</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                Empower your fitness journey with <strong className="text-white">HM Sports</strong>. Eliminate muscle knots, increase Range of Motion, and conquer your recovery goals with our professional deep tissue therapy line.
              </p>

              {/* Focus Banner highlight of Flagship Massager */}
              <div className="bg-pitchgreen p-4 sm:p-5 rounded-2xl border border-pitchgreen-light max-w-md mx-auto lg:mx-0 flex items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] text-limeaccent font-mono font-bold tracking-widest uppercase">FLAGSHIP RECOVERY GEAR</span>
                  <h4 className="text-white text-sm font-display font-bold mt-0.5">{flagshipProduct.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-limeaccent font-sans font-bold text-lg">Rs. {flagshipProduct.price.toLocaleString()}</span>
                    <span className="text-gray-500 font-sans text-xs line-through">Rs. {flagshipProduct.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(flagshipProduct)}
                  className="bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-200"
                >
                  View Details
                </button>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleNavigateToSection("products-section")}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-black text-sm uppercase tracking-wider py-4.5 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-limeaccent/10 active:scale-[0.98]"
                >
                  <span>EXPLORE OUR CATALOG</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => handleAddToCart(flagshipProduct)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-pitchgreen-light hover:border-limeaccent/60 bg-transparent text-white hover:text-limeaccent py-4.5 px-8 rounded-xl transition-all duration-300 text-sm font-bold"
                >
                  <span>ORDER MASSAGE GUN NOW</span>
                </button>
              </div>
            </div>

            {/* Hero Right Image Frame - Consistent <picture> tag */}
            <div className="lg:col-span-5 relative">
              {/* Glowing Ambient Background Spot */}
              <div className="absolute inset-0 bg-limeaccent/10 rounded-full filter blur-[100px] -z-10" />

              <div className="relative mx-auto max-w-md lg:max-w-none aspect-square bg-pitchgreen-light/30 border border-pitchgreen-light rounded-3xl overflow-hidden p-3 shadow-2xl">
                <picture className="w-full h-full block rounded-2xl overflow-hidden relative">
                  {/* Mobile Version: Tighter portrait-crop */}
                  <source 
                    media="(max-width: 640px)" 
                    srcSet={flagshipProduct.images.mobile} 
                  />
                  {/* Desktop Version: Wide detailed lifestyle */}
                  <img 
                    src={flagshipProduct.images.desktop} 
                    alt="HM Massage Gun recovery device" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </picture>
                
                {/* Floating Trust Badge */}
                <div className="absolute bottom-6 right-6 bg-pitchgreen-dark/90 backdrop-blur-md border border-pitchgreen-light px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <div>
                    <div className="text-white text-xs font-sans font-bold">4.9 Star Rating</div>
                    <div className="text-gray-400 text-[9px] font-sans">140+ verified Pakistani clients</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. TRUST BAR — Small strip with icons */}
      <section className="bg-pitchgreen-dark border-y border-pitchgreen-light/40 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-pitchgreen-light/30">
            
            {/* Item 1: Fast Delivery */}
            <div className="flex items-center space-x-4 px-3 py-2 lg:py-0 first:pt-0">
              <div className="bg-limeaccent/10 text-limeaccent p-3 rounded-2xl">
                <Truck className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-display text-sm font-bold">Fast Delivery</h4>
                <p className="text-gray-400 text-xs font-sans mt-0.5">2-4 days across Pakistan</p>
              </div>
            </div>

            {/* Item 2: COD Available */}
            <div className="flex items-center space-x-4 px-3 pt-4 lg:pt-0 lg:px-6">
              <div className="bg-limeaccent/10 text-limeaccent p-3 rounded-2xl">
                <Banknote className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-display text-sm font-bold">COD Available</h4>
                <p className="text-gray-400 text-xs font-sans mt-0.5">100% Cash on Delivery</p>
              </div>
            </div>

            {/* Item 3: Easy Returns */}
            <div className="flex items-center space-x-4 px-3 pt-4 lg:pt-0 lg:px-6">
              <div className="bg-limeaccent/10 text-limeaccent p-3 rounded-2xl">
                <RotateCcw className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-display text-sm font-bold">Easy Returns</h4>
                <p className="text-gray-400 text-xs font-sans mt-0.5">7-day hassle free return policy</p>
              </div>
            </div>

            {/* Item 4: Quality Guaranteed */}
            <div className="flex items-center space-x-4 px-3 pt-4 lg:pt-0 lg:px-6">
              <div className="bg-limeaccent/10 text-limeaccent p-3 rounded-2xl">
                <ShieldCheck className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-display text-sm font-bold">Quality Guaranteed</h4>
                <p className="text-gray-400 text-xs font-sans mt-0.5">100% original fitness items</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION — Partitioned by Shop by Category visual layout */}
      <section id="products-section" className="py-16 sm:py-24 bg-pitchgreen/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black">HM Sports Store Catalog</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Shop by Category
            </h2>
            <p className="text-gray-300 text-sm font-sans leading-relaxed">
              Find the perfect gear to amplify your athletic lifestyle. Complete with 100% Nationwide Cash on Delivery and instant order routing via WhatsApp.
            </p>
          </div>

          {/* 1. Category Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Category Card: Sports Gear */}
            <div 
              onClick={() => {
                setActiveCategory("gear");
                handleNavigateToSection("products-section");
              }}
              className={`group relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between min-h-[220px] ${
                activeCategory === "gear" 
                  ? "border-limeaccent bg-pitchgreen-light/40 shadow-lg shadow-limeaccent/10" 
                  : "border-pitchgreen-light/40 bg-pitchgreen-light/10 hover:border-limeaccent/30 hover:bg-pitchgreen-light/20"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-limeaccent uppercase">Pro Hardware & Bats</span>
                  <div className="bg-limeaccent/10 text-limeaccent p-2.5 rounded-xl border border-limeaccent/15">
                    <Dumbbell className="h-5 w-5 stroke-[2.2]" />
                  </div>
                </div>
                <h3 className="text-white text-xl font-display font-black tracking-tight group-hover:text-limeaccent transition-colors">
                  Sports Gear
                </h3>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  Premium English Willow bats, vulcanized Diamond Wave grips, training footwear, and heavy-duty resistance bands.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-pitchgreen-light/25 mt-2">
                <span className="text-[10px] font-mono text-limeaccent bg-limeaccent/10 px-2 py-0.5 rounded font-bold">4 Items available</span>
                <span className="text-xs font-bold text-gray-300 flex items-center group-hover:text-white transition-colors">
                  Explore Gear
                  <ChevronRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Category Card: Sports Electronics */}
            <div 
              onClick={() => {
                setActiveCategory("sports-electronics");
                handleNavigateToSection("products-section");
              }}
              className={`group relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between min-h-[220px] ${
                activeCategory === "sports-electronics" 
                  ? "border-limeaccent bg-pitchgreen-light/40 shadow-lg shadow-limeaccent/10" 
                  : "border-pitchgreen-light/40 bg-pitchgreen-light/10 hover:border-limeaccent/30 hover:bg-pitchgreen-light/20"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-limeaccent uppercase">Smart Hydration & Therapy</span>
                  <div className="bg-limeaccent/10 text-limeaccent p-2.5 rounded-xl border border-limeaccent/15">
                    <Zap className="h-5 w-5 stroke-[2.2]" />
                  </div>
                </div>
                <h3 className="text-white text-xl font-display font-black tracking-tight group-hover:text-limeaccent transition-colors">
                  Sports Electronics
                </h3>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  Double-walled vacuum Temperature flasks, and professional high-torque deep tissue percussion massage guns.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-pitchgreen-light/25 mt-2">
                <span className="text-[10px] font-mono text-limeaccent bg-limeaccent/10 px-2 py-0.5 rounded font-bold">2 Items available</span>
                <span className="text-xs font-bold text-gray-300 flex items-center group-hover:text-white transition-colors">
                  Explore Sports Tech
                  <ChevronRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Category Card: Electronic Section */}
            <div 
              onClick={() => {
                setActiveCategory("lifestyle-electronics");
                handleNavigateToSection("products-section");
              }}
              className={`group relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between min-h-[220px] ${
                activeCategory === "lifestyle-electronics" 
                  ? "border-limeaccent bg-pitchgreen-light/40 shadow-lg shadow-limeaccent/10" 
                  : "border-pitchgreen-light/40 bg-pitchgreen-light/10 hover:border-limeaccent/30 hover:bg-pitchgreen-light/20"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-limeaccent uppercase">Lifestyle & Fabric Tech</span>
                  <div className="bg-limeaccent/10 text-limeaccent p-2.5 rounded-xl border border-limeaccent/15">
                    <Cpu className="h-5 w-5 stroke-[2.2]" />
                  </div>
                </div>
                <h3 className="text-white text-xl font-display font-black tracking-tight group-hover:text-limeaccent transition-colors">
                  Electronic Section
                </h3>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  Ultra-low latency cricket earbuds and high-speed rotary activewear fabric shaver lint machines.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-pitchgreen-light/25 mt-2">
                <span className="text-[10px] font-mono text-limeaccent bg-limeaccent/10 px-2 py-0.5 rounded font-bold">2 Items available</span>
                <span className="text-xs font-bold text-gray-300 flex items-center group-hover:text-white transition-colors">
                  Explore Electronics
                  <ChevronRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

          </div>

          {/* Quick Filter Status Indicator */}
          <div className="flex items-center justify-between border-b border-pitchgreen-light/20 pb-4 pt-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center space-x-2 flex-nowrap shrink-0">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase hidden sm:inline">Current Filter:</span>
              <button 
                onClick={() => setActiveCategory("all")}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                  activeCategory === "all" 
                    ? "bg-limeaccent text-pitchgreen-dark border-limeaccent" 
                    : "bg-pitchgreen-light/20 text-gray-300 border-pitchgreen-light/40 hover:text-white"
                }`}
              >
                All Products
              </button>
              <button 
                onClick={() => setActiveCategory("gear")}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                  activeCategory === "gear" 
                    ? "bg-limeaccent text-pitchgreen-dark border-limeaccent" 
                    : "bg-pitchgreen-light/20 text-gray-300 border-pitchgreen-light/40 hover:text-white"
                }`}
              >
                Sports Gear ({PRODUCTS.filter(p => p.category === "gear").length})
              </button>
              <button 
                onClick={() => setActiveCategory("sports-electronics")}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                  activeCategory === "sports-electronics" 
                    ? "bg-limeaccent text-pitchgreen-dark border-limeaccent" 
                    : "bg-pitchgreen-light/20 text-gray-300 border-pitchgreen-light/40 hover:text-white"
                }`}
              >
                Sports Electronics ({PRODUCTS.filter(p => p.category === "sports-electronics").length})
              </button>
              <button 
                onClick={() => setActiveCategory("lifestyle-electronics")}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                  activeCategory === "lifestyle-electronics" 
                    ? "bg-limeaccent text-pitchgreen-dark border-limeaccent" 
                    : "bg-pitchgreen-light/20 text-gray-300 border-pitchgreen-light/40 hover:text-white"
                }`}
              >
                Electronic Section ({PRODUCTS.filter(p => p.category === "lifestyle-electronics").length})
              </button>
            </div>
            {activeCategory !== "all" && (
              <button 
                onClick={() => setActiveCategory("all")}
                className="text-xs font-mono font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Reset View</span>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 2. "Sports Electronics" Section */}
          {(activeCategory === "all" || activeCategory === "sports-electronics") && (
            <div className="space-y-6 pt-2 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-pitchgreen-light/40 pb-4">
                <div>
                  <span className="text-limeaccent font-mono text-[10px] uppercase font-bold tracking-widest">SMART & THERAPEUTIC HYDRATION SYSTEMS</span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    ⚡ Sports Electronics Section
                  </h3>
                  <p className="text-gray-400 text-xs font-sans mt-1">
                    Premium high-torque deep tissue percussion massage guns and high-performance vacuum temperature flasks.
                  </p>
                </div>
                <span className="text-[10px] text-limeaccent bg-pitchgreen-light/30 border border-limeaccent/20 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                  SPORTS TECH
                </span>
              </div>

              {/* Grid showing Sports Electronics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.filter(p => p.category === "sports-electronics").map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. "Electronic Section" Section */}
          {(activeCategory === "all" || activeCategory === "lifestyle-electronics") && (
            <div className="space-y-6 pt-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-pitchgreen-light/40 pb-4">
                <div>
                  <span className="text-limeaccent font-mono text-[10px] uppercase font-bold tracking-widest">HIGH-PERFORMANCE AUDIO & ATHLETIC FABRIC CARE</span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    🔌 Electronic Section
                  </h3>
                  <p className="text-gray-400 text-xs font-sans mt-1">
                    Featuring sweatproof sports earbuds with ultra-low latency and cordless electric fabric shaving lint machines.
                  </p>
                </div>
                <span className="text-[10px] text-limeaccent bg-pitchgreen-light/30 border border-limeaccent/20 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                  ELECTRONIC SECTION
                </span>
              </div>

              {/* Grid showing Electronic Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.filter(p => p.category === "lifestyle-electronics").map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. "Sports Gear" Section */}
          {(activeCategory === "all" || activeCategory === "gear") && (
            <div className="space-y-6 pt-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-pitchgreen-light/40 pb-4">
                <div>
                  <span className="text-red-400 font-mono text-[10px] uppercase font-bold tracking-widest">NATION'S CRICKET & ATHLETIC HEARTBEAT</span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    🏏 Sports Gear Section
                  </h3>
                  <p className="text-gray-400 text-xs font-sans mt-1">
                    Premium English Willow CA/HS standard bats, tactile vulcanized diamond wave grips, training footwear, and heavy-duty resistance bands.
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 bg-pitchgreen-light/20 border border-gray-600/30 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                  GEAR SECTION
                </span>
              </div>

              {/* Grid showing Sports Gear */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.filter(p => p.category === "gear").map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. PRODUCT DETAIL MODAL — handles deeper spec check / view detail overlay */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. WHY CHOOSE US / BENEFITS SECTION — 4 blocks */}
      <section id="benefits-section" className="py-16 sm:py-24 bg-pitchgreen-dark border-t border-pitchgreen-light/20 relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute right-0 bottom-0 bg-limeaccent/5 rounded-full filter blur-[120px] h-96 w-96 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section text */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black">Our Standards</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Public Choose HM Services
            </h2>
            <p className="text-gray-300 text-sm font-sans leading-relaxed">
              We specialize in bridging elite performance recovery with affordable pricing structures for gym goers, cricketers, and professional athletes nationwide.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNavigateToSection("products-section")}
                className="bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-200 inline-flex items-center space-x-1.5"
              >
                <span>Shop Premium Catalog</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Benefit Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map(benefit => {
              const IconComp = ICON_MAP[benefit.icon] || ShieldCheck;
              return (
                <div 
                  key={benefit.id}
                  className="bg-pitchgreen-light/20 border border-pitchgreen-light/40 rounded-2xl p-6 hover:border-limeaccent/30 transition-all duration-300"
                >
                  <div className="bg-limeaccent/10 text-limeaccent w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-limeaccent/20">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h4 className="text-white font-display text-base font-bold mb-1.5">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS/REVIEWS SECTION */}
      <section id="testimonials-section" className="py-16 sm:py-24 bg-pitchgreen/10 border-t border-pitchgreen-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Testimonial Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black">Client Feedback</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Verified Public Reviews
            </h2>
            <p className="text-gray-300 text-sm font-sans">
              See how fitness enthusiasts and sports players in Pakistan use HM Sports to enhance their daily recovery cycles.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map(t => (
              <div 
                key={t.id} 
                className="bg-pitchgreen-light/20 border border-pitchgreen-light/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-limeaccent/20 transition-all duration-300"
              >
                <div>
                  {/* Rating Stars & Verified flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-current" />
                      ))}
                    </div>
                    {t.verified && (
                      <span className="inline-flex items-center bg-limeaccent/10 text-limeaccent font-sans font-semibold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-limeaccent/20">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-gray-200 font-sans text-sm italic leading-relaxed mb-6">
                    "{t.comment}"
                  </blockquote>
                </div>

                {/* Buyer profile */}
                <div className="flex justify-between items-center pt-4 border-t border-pitchgreen-light/20">
                  <div>
                    <cite className="not-italic text-white font-display text-sm font-bold block">
                      {t.name}
                    </cite>
                    <span className="text-[11px] text-gray-400 font-sans mt-0.5 block">
                      {t.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 font-sans block uppercase">PRODUCT PURCHASED</span>
                    <span className="text-[11px] text-limeaccent font-sans font-semibold block">
                      {t.productBought}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. SHOPPING CART SLIDE DRAWER (Connected with states) */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      {/* 9. CHECKOUT SECTION */}
      <section id="checkout-section" className="py-16 sm:py-24 bg-pitchgreen-dark border-t border-pitchgreen-light/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black">Safe Checkout</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Complete Your Purchase
            </h2>
            <p className="text-gray-300 text-sm font-sans leading-relaxed">
              No credit card needed! Pay with secure Cash on Delivery (COD) or EasyPaisa/JazzCash upon dispatch. Delivery takes 2-4 working days.
            </p>
          </div>

          {/* Form component integration */}
          {cartItems.length === 0 ? (
            <div className="bg-pitchgreen-light/10 border border-pitchgreen-light/30 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
              <div className="bg-pitchgreen w-14 h-14 rounded-full flex items-center justify-center text-gray-500 mx-auto border border-pitchgreen-light/30">
                <Dumbbell className="h-6 w-6" />
              </div>
              <h3 className="text-white font-display text-lg font-bold">Your Checkout is Empty</h3>
              <p className="text-gray-400 text-xs font-sans max-w-xs mx-auto">
                Please add one or more products to your cart above to proceed with your delivery details.
              </p>
              <button
                onClick={() => handleNavigateToSection("products-section")}
                className="bg-limeaccent hover:bg-limeaccent-dark text-pitchgreen-dark font-sans font-bold text-xs py-3 px-6 rounded-xl transition-all inline-block uppercase tracking-wider"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <CheckoutForm
              cartItems={cartItems}
              onOrderPlaced={() => triggerToast("Order processed! Tap WhatsApp to confirm details.")}
              onClearCart={handleClearCart}
            />
          )}

        </div>
      </section>

      {/* 10. FAQ SECTION — Accordions */}
      <section id="faq-section" className="py-16 sm:py-24 bg-pitchgreen/10 border-t border-pitchgreen-light/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black">Support Center</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-sm font-sans">
              Everything you need to know about delivery times, refunds, open-parcel options, and our WhatsApp dispatch.
            </p>
          </div>

          <FAQSection />

        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-pitchgreen-dark border-t border-pitchgreen-light/40 pt-16 pb-8 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-pitchgreen-light/20 pb-12">
          
          {/* Footer Logo and Brand Bio */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-limeaccent text-pitchgreen-dark p-1.5 rounded font-bold flex items-center justify-center">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-wider">
                HM <span className="text-limeaccent">SPORTS</span>
              </span>
            </div>
            <p className="text-xs font-sans text-gray-400 leading-relaxed">
              HM Sports is Pakistan's leading athletic recovery and fitness hardware designer. We engineer high-amplitude percussion massagers, double-walled thermal flasks, and robust vulcanized bat grips to unleash athletic potential nationwide.
            </p>
            <div className="text-xs text-limeaccent font-mono font-bold flex items-center space-x-2 bg-pitchgreen-light/20 px-3 py-1.5 rounded-lg border border-pitchgreen-light/40 w-fit">
              <span className="animate-ping rounded-full h-1.5 w-1.5 bg-limeaccent inline-block" />
              <span>NATIONWIDE SERVICE: 24/7 SUPPORT AVAILABLE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-display text-xs font-bold uppercase tracking-widest">
              Quick Navigation
            </h4>
            <ul className="text-xs space-y-2.5 font-sans">
              <li>
                <button 
                  onClick={() => handleNavigateToSection("hero-section")} 
                  className="hover:text-limeaccent transition-colors"
                >
                  Flagship Product
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection("products-section")} 
                  className="hover:text-limeaccent transition-colors"
                >
                  Featured Gear Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection("benefits-section")} 
                  className="hover:text-limeaccent transition-colors"
                >
                  Why Choose HM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection("testimonials-section")} 
                  className="hover:text-limeaccent transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigateToSection("faq-section")} 
                  className="hover:text-limeaccent transition-colors"
                >
                  Help & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white font-display text-xs font-bold uppercase tracking-widest">
              Contact & Support Desk
            </h4>
            <ul className="text-xs space-y-3.5 font-sans">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-limeaccent flex-shrink-0" />
                <span>HM Sports Distribution Hub, DHA Phase 6, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-limeaccent flex-shrink-0" />
                <span>+92 300 1234567 (WhatsApp Order Desk)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-limeaccent flex-shrink-0" />
                <span>support@hmsports.pk</span>
              </li>
            </ul>

            {/* Micro Badges for payment security */}
            <div className="pt-2 flex flex-wrap gap-2.5 items-center">
              <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest">ACCEPTED IN PAKISTAN:</span>
              <span className="bg-pitchgreen text-gray-300 text-[10px] px-2 py-0.5 rounded border border-pitchgreen-light/40 font-mono font-bold">CASH ON DELIVERY</span>
              <span className="bg-pitchgreen text-gray-300 text-[10px] px-2 py-0.5 rounded border border-pitchgreen-light/40 font-mono font-bold">EASYPAISA</span>
              <span className="bg-pitchgreen text-gray-300 text-[10px] px-2 py-0.5 rounded border border-pitchgreen-light/40 font-mono font-bold">JAZZCASH</span>
            </div>
          </div>

        </div>

        {/* Legal Footer Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-sans">
            © {new Date().getFullYear()} HM Sports Pakistan. All rights reserved. Registered private logistics merchant.
          </p>
          <div className="flex space-x-6 font-sans text-gray-500">
            <a href="#hero-section" className="hover:text-limeaccent">Terms & Conditions</a>
            <span>•</span>
            <a href="#hero-section" className="hover:text-limeaccent">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
