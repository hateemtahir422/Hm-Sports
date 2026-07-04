import { useState } from "react";
import { ShoppingCart, Menu, X, Dumbbell } from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navbar({
  cartItemCount,
  onOpenCart,
  onNavigateToSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Products", id: "products-section" },
    { label: "Why Choose Us", id: "benefits-section" },
    { label: "Reviews", id: "testimonials-section" },
    { label: "FAQs", id: "faq-section" },
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-pitchgreen-dark/95 backdrop-blur-md border-b border-pitchgreen-light/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("hero-section")} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-limeaccent text-pitchgreen-dark p-2 rounded-lg font-bold flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Dumbbell className="h-6 w-6" />
            </div>
            <span className="font-display text-2xl font-bold text-white tracking-wider">
              HM <span className="text-limeaccent">SPORTS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-300 hover:text-limeaccent font-sans font-medium text-sm transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart Icon & Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-white bg-pitchgreen hover:bg-pitchgreen-light hover:text-limeaccent transition-all duration-200 focus:outline-none"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-limeaccent text-pitchgreen-dark font-sans font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full animate-pulse border-2 border-pitchgreen-dark">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-pitchgreen-light focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-pitchgreen-dark/95 border-b border-pitchgreen-light/50 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-pitchgreen-dark hover:bg-limeaccent transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-pitchgreen-light/30 px-4">
            <span className="text-xs text-limeaccent font-mono">
              ⚡ FREE SHIPPING FOR FIRST 100 CUSTOMERS
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
