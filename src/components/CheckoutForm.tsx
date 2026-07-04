import React, { useState } from "react";
import { CartItem } from "./CartDrawer";
import { CheckCircle2, Phone, MapPin, User, Building, Landmark, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

interface CheckoutFormProps {
  cartItems: CartItem[];
  onOrderPlaced: () => void;
  onClearCart: () => void;
}

export default function CheckoutForm({
  cartItems,
  onOrderPlaced,
  onClearCart,
}: CheckoutFormProps) {
  // Shipping details state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, easypaisa, jazzcash

  // Order submission success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryCharges = 0; // Free delivery promo
  const total = subtotal + deliveryCharges;

  // Pre-configured popular Pakistani cities for easier auto-fill selection
  const popularCities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validations
    if (!name.trim()) return setErrorMsg("Please enter your full name.");
    if (!phone.trim() || phone.length < 10) return setErrorMsg("Please enter a valid Pakistani phone number (e.g. 03001234567).");
    if (!address.trim()) return setErrorMsg("Please enter your full shipping address.");
    if (!city.trim()) return setErrorMsg("Please specify your city.");

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `HM-${randomNum}`;

    try {
      const orderData = {
        order_id: newOrderId,
        customer_name: name,
        customer_phone: phone,
        shipping_address: address,
        city: city,
        payment_method: paymentMethod,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        total_amount: total
      };

      const { error } = await supabase.from("orders").insert([orderData]);

      if (error) {
        console.error("Supabase Error:", error);
        throw new Error(error.message || "Database insert failed.");
      }

      setOrderId(newOrderId);
      setIsSuccess(true);
      onOrderPlaced(); // Callback to parent
    } catch (err: any) {
      console.error("Failed to place order:", err);
      setErrorMsg(
        `Failed to save your order to Supabase: ${err.message || "Unknown error"}. Make sure your 'orders' table is created in your Supabase database.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    // Reset state & clear cart
    onClearCart();
    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setPaymentMethod("cod");
    setIsSuccess(false);
    setOrderId("");
  };

  // Pre-fills a gorgeous WhatsApp message for Pakistani sports audience
  const getWhatsAppLink = () => {
    const brandPhone = "923001234567"; // HM Sports official dispatch line placeholder
    const itemDetails = cartItems
      .map(item => `${item.product.name} (x${item.quantity})`)
      .join(", ");
    
    const text = `Assalam-o-Alaikum HM Sports! 🇵🇰 I've just placed order *#${orderId}* on your website. 

📦 *Order Details:*
- *Items:* ${itemDetails}
- *Total Amount:* Rs. ${total.toLocaleString()}
- *Payment Method:* ${paymentMethod.toUpperCase()}

👤 *Shipping Info:*
- *Name:* ${name}
- *Phone:* ${phone}
- *Address:* ${address}
- *City:* ${city}

Please confirm my dispatch! Thank you.`;

    return `https://wa.me/${brandPhone}?text=${encodeURIComponent(text)}`;
  };

  if (isSuccess) {
    return (
      <div className="bg-pitchgreen-light/20 border border-pitchgreen-light rounded-3xl p-6 sm:p-10 text-center space-y-6 max-w-2xl mx-auto animate-scaleIn">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-limeaccent text-pitchgreen-dark">
          <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-limeaccent font-mono text-xs uppercase tracking-widest font-black block">Order Logged Successfully</span>
          <h3 className="text-white font-display text-2xl sm:text-3xl font-black tracking-tight">
            Order #{orderId} Is Placed!
          </h3>
          <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed font-sans">
            Assalam-o-Alaikum, <strong className="text-white">{name}</strong>. Thank you for shopping with HM Sports! Your package is being processed for <strong className="text-limeaccent">Free Cash on Delivery</strong>.
          </p>
        </div>

        {/* EasyPaisa / JazzCash payment instructions */}
        {paymentMethod !== "cod" && (
          <div className="bg-pitchgreen border border-pitchgreen-light/80 rounded-2xl p-5 text-left space-y-3">
            <h4 className="text-white font-display text-xs font-bold uppercase tracking-wider text-limeaccent flex items-center space-x-1.5">
              <Landmark className="h-4 w-4" />
              <span>EasyPaisa / JazzCash Payment Instructions</span>
            </h4>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Please transfer <strong className="text-white">Rs. {total.toLocaleString()}</strong> to our official business account below:
            </p>
            <div className="bg-pitchgreen-dark p-3.5 rounded-xl text-xs space-y-1.5 font-mono border border-pitchgreen-light/20">
              <div className="flex justify-between"><span className="text-gray-400">Bank/Wallet:</span><span className="text-white font-bold">{paymentMethod === "easypaisa" ? "EasyPaisa" : "JazzCash"}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Account Number:</span><span className="text-limeaccent font-bold">0300-1234567</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Account Title:</span><span className="text-white font-bold">HM Sports Private Ltd.</span></div>
            </div>
            <p className="text-[10px] text-gray-400 italic font-sans">
              *Once paid, please take a screenshot of your payment receipt and send it via WhatsApp using the button below for instant confirmation!
            </p>
          </div>
        )}

        {/* Dynamic WhatsApp Dispatch Trigger */}
        <div className="p-1 bg-pitchgreen-light/30 border border-pitchgreen-light/40 rounded-2xl">
          <div className="p-4 sm:p-5 bg-pitchgreen-dark/80 rounded-xl text-center space-y-4">
            <h4 className="text-sm text-white font-display font-bold">
              ⚡ Double Your Shipping Speed!
            </h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed font-sans">
              Press the button below to send your order confirmation directly to our WhatsApp dispatch desk for instant 24-hour verification.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/10 active:scale-[0.99]"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.723-1.458L0 24zm6.368-3.715c1.611.956 3.197 1.458 4.793 1.459 5.518 0 10.011-4.49 10.014-10.007.002-2.673-1.037-5.187-2.928-7.08C16.417 2.763 13.916 1.72 11.247 1.72 5.732 1.72 1.24 6.21 1.238 11.729c-.001 1.696.446 3.35 1.296 4.825L1.571 20.3l3.926-.1.928.545z" />
              </svg>
              <span>Confirm via WhatsApp Now</span>
            </a>
          </div>
        </div>

        <div>
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white text-xs underline font-medium font-sans cursor-pointer transition-all"
          >
            Go Back & Shop More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pitchgreen-light/20 border border-pitchgreen-light rounded-3xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Column 1: Checkout Form inputs */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="border-b border-pitchgreen-light/40 pb-4">
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              Customer Shipping Info
            </h3>
            <p className="text-xs text-gray-400 font-sans mt-1">
              Please enter your actual active address for accurate Cash on Delivery dispatch.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded-xl">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
              <User className="h-4 w-4 text-limeaccent" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Muhammad Bilal"
              className="w-full bg-pitchgreen-dark border border-pitchgreen-light hover:border-limeaccent/40 focus:border-limeaccent text-white rounded-xl py-3 px-4 text-sm font-sans placeholder-gray-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Phone className="h-4 w-4 text-limeaccent" />
              <span>Active Mobile Number</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 03001234567"
              className="w-full bg-pitchgreen-dark border border-pitchgreen-light hover:border-limeaccent/40 focus:border-limeaccent text-white rounded-xl py-3 px-4 text-sm font-sans placeholder-gray-500 focus:outline-none transition-all duration-200"
              required
            />
            <p className="text-[10px] text-gray-500 font-sans italic">
              *Include a valid number for order verification call / SMS prior to dispatch.
            </p>
          </div>

          {/* City Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Building className="h-4 w-4 text-limeaccent" />
              <span>City</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Lahore"
              className="w-full bg-pitchgreen-dark border border-pitchgreen-light hover:border-limeaccent/40 focus:border-limeaccent text-white rounded-xl py-3 px-4 text-sm font-sans placeholder-gray-500 focus:outline-none transition-all duration-200"
              required
            />
            
            {/* Quick selectors for Pakistani cities */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {popularCities.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`text-[10px] font-sans font-semibold px-2.5 py-1 rounded-md border transition-all ${
                    city.toLowerCase() === c.toLowerCase()
                      ? "bg-limeaccent border-limeaccent text-pitchgreen-dark"
                      : "bg-pitchgreen border-pitchgreen-light text-gray-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Full Address Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
              <MapPin className="h-4 w-4 text-limeaccent" />
              <span>Full Shipping Address</span>
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House #, Street #, Sector / Area, Landmark, City"
              rows={3}
              className="w-full bg-pitchgreen-dark border border-pitchgreen-light hover:border-limeaccent/40 focus:border-limeaccent text-white rounded-xl py-3 px-4 text-sm font-sans placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none"
              required
            />
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="text-xs font-sans font-bold text-gray-300 uppercase tracking-wider block">
              Choose Payment Method
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Cash on Delivery option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`relative flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "bg-pitchgreen border-limeaccent shadow-[0_4px_20px_rgba(198,255,61,0.1)]"
                    : "bg-pitchgreen-dark/40 border-pitchgreen-light hover:border-limeaccent/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-white">COD</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-limeaccent"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-sans mt-2.5">
                  Cash on Delivery. Pay at your doorstep upon receiving package.
                </p>
              </div>

              {/* EasyPaisa option */}
              <div
                onClick={() => setPaymentMethod("easypaisa")}
                className={`relative flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "easypaisa"
                    ? "bg-pitchgreen border-limeaccent shadow-[0_4px_20px_rgba(198,255,61,0.1)]"
                    : "bg-pitchgreen-dark/40 border-pitchgreen-light hover:border-limeaccent/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-white">EasyPaisa</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "easypaisa"}
                    onChange={() => setPaymentMethod("easypaisa")}
                    className="accent-limeaccent"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-sans mt-2.5">
                  Transfer to EasyPaisa and send screenshot via WhatsApp.
                </p>
              </div>

              {/* JazzCash option */}
              <div
                onClick={() => setPaymentMethod("jazzcash")}
                className={`relative flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "jazzcash"
                    ? "bg-pitchgreen border-limeaccent shadow-[0_4px_20px_rgba(198,255,61,0.1)]"
                    : "bg-pitchgreen-dark/40 border-pitchgreen-light hover:border-limeaccent/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-white">JazzCash</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "jazzcash"}
                    onChange={() => setPaymentMethod("jazzcash")}
                    className="accent-limeaccent"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-sans mt-2.5">
                  Transfer to JazzCash and send screenshot via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={cartItems.length === 0 || isSubmitting}
              className="w-full bg-limeaccent hover:bg-limeaccent-dark disabled:bg-gray-700 disabled:text-gray-400 text-pitchgreen-dark font-sans font-black text-sm uppercase tracking-wider py-4.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-limeaccent/10 active:scale-[0.99] cursor-pointer flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-pitchgreen-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Order...</span>
                </span>
              ) : (
                <span>Place Order — Rs. {total.toLocaleString()} (Free Delivery)</span>
              )}
            </button>
          </div>
        </form>

        {/* Column 2: Order Summary breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-pitchgreen p-5 sm:p-6 rounded-2xl border border-pitchgreen-light/40 space-y-4">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider text-limeaccent">
              Order Summary
            </h4>

            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-xs font-sans">No items in your cart to check out.</p>
            ) : (
              <div className="divide-y divide-pitchgreen-light/20 space-y-3.5">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs pt-3.5 first:pt-0">
                    <div className="space-y-0.5">
                      <span className="text-white font-sans font-bold block">
                        {item.product.name}
                      </span>
                      <span className="text-gray-400 font-sans">
                        Qty: {item.quantity} x Rs. {item.product.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-white font-sans font-semibold">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Bill Breakdown */}
                <div className="space-y-2.5 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-sans">Subtotal</span>
                    <span className="text-white font-sans">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-sans">Delivery Charges</span>
                    <span className="text-limeaccent font-sans uppercase font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-pitchgreen-light/20">
                    <span className="text-white font-display font-bold">Total Amount Due</span>
                    <span className="text-limeaccent font-sans font-black text-lg">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pakistani Trust Signals */}
          <div className="space-y-3 bg-pitchgreen-light/10 border border-pitchgreen-light/30 p-5 rounded-2xl">
            <h5 className="text-white font-display text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <span>🇵🇰 HM Sports Pakistan Guarantees</span>
            </h5>
            <ul className="text-xs text-gray-300 font-sans space-y-2">
              <li className="flex items-start">
                <span className="text-limeaccent mr-2 font-bold">✓</span>
                <span>Dispatch validation call within 12 hours.</span>
              </li>
              <li className="flex items-start">
                <span className="text-limeaccent mr-2 font-bold">✓</span>
                <span>Trackable Leopard or TCS logistics shipment details provided.</span>
              </li>
              <li className="flex items-start">
                <span className="text-limeaccent mr-2 font-bold">✓</span>
                <span>Open-parcel inspection allowed upon request for authentic checks.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
