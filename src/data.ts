export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  category: "gear" | "sports-electronics" | "lifestyle-electronics";
  // Two separate image sources for desktop/mobile crops
  images: {
    desktop: string; // Widescreen / Landscape lifestyle
    mobile: string;  // Tighter / Portrait crop
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "bat-grip",
    name: "HM Cricket Bat Diamond Wave Grip (Pack of 3)",
    price: 950,
    originalPrice: 1500,
    rating: 4.9,
    reviewCount: 116,
    badge: "🔥 Best Seller",
    description: "Ab Khel Jame Ga! Professional-grade diamond-texture cricket bat grips designed to maximize shock absorption and grip under sweat. Engineered for Pakistan's punishing summer heat, perfect for tape-ball, local street tournaments, and elite leather-ball bats. Slip-free performance for ultimate match control.",
    features: [
      "Diamond wave tactile pattern for exceptional slip-free handle control",
      "100% vulcanized elastomeric rubber built for harsh Pakistani heat",
      "Excellent shock absorption to completely eliminate hand-sting on fast bowls",
      "Universal fit for all standard English Willow, Kashmir Willow, and local tape-ball bats",
      "Value pack containing 3 grips (Lime Green, Pitch Black, Elite White)"
    ],
    specs: {
      "Pack Quantity": "3 Individual Premium Grips",
      "Texture Pattern": "Diamond-wave High Tactility",
      "Material": "Sweat-Resistant Elastomeric Rubber",
      "Length": "Standard Full Size Bat Length",
      "Thickness": "1.2mm Optimized Feel"
    },
    category: "gear",
    images: {
      desktop: "/src/assets/images/premium_bat_grips_1782969787645.jpg",
      mobile: "/src/assets/images/premium_bat_grips_1782969787645.jpg"
    }
  },
  {
    id: "training-shoes",
    name: "HM NitroGlide Ultra Training Shoes",
    price: 4950,
    originalPrice: 7500,
    rating: 4.8,
    reviewCount: 95,
    badge: "⚡ New Release",
    description: "Designed for explosive responsiveness and extreme lateral stability on the court. Highly recommended for international football fans playing turf matches (Premier League/UCL vibe) in urban hubs, as well as hard gym sessions. High durability sole built to withstand rough local surfaces.",
    features: [
      "NitroGlide reactive dual-density foam midsole for intense energy return",
      "Lightweight, engineered woven mesh upper for maximum heat ventilation",
      "Heel-lock stabilization frame for rapid lateral cuts and sprints",
      "High-durability carbon rubber traction outsole for indoor/outdoor turf grounds",
      "Ortholite moisture-wicking comfort insole"
    ],
    specs: {
      "Type": "Neutral / Dynamic Turf & Training",
      "Midsole Drop": "8mm",
      "Arch Support": "Medium to High",
      "Weight": "280g (Size 9)",
      "Closure": "Traditional Athletic Lacing"
    },
    category: "gear",
    images: {
      desktop: "/src/assets/images/training_shoes_pic_1782921350024.jpg",
      mobile: "/src/assets/images/training_shoes_pic_1782921350024.jpg"
    }
  },
  {
    id: "massage-gun",
    name: "HM Pro Percussion Massage Gun",
    price: 6850,
    originalPrice: 9500,
    rating: 4.9,
    reviewCount: 142,
    badge: "👑 Elite Recovery",
    description: "Banish 'Shadeed Thakaawat' (severe fatigue) instantly. The absolute recovery gold standard for professional athletes and fast bowlers across Pakistan. Deep tissue percussion massager with 6 interchangeable heads and 30 speed levels. Designed to completely relieve muscle soreness and speed up your match readiness.",
    features: [
      "Ultra-quiet brushless motor (< 45dB)",
      "30 adjustable speed gears up to 3200 RPM",
      "6 specialized therapeutic massage heads",
      "Long-lasting 2500mAh rechargeable battery (up to 6 hours)",
      "Sleek LED touch control display"
    ],
    specs: {
      "Motor": "24V Brushless High-Torque",
      "Amplitude": "12mm Deep Tissue",
      "Battery Life": "4 to 6 Hours Active Use",
      "Charging Port": "Type-C Fast Charge",
      "Weight": "0.9 kg (Lightweight & Ergonomic)"
    },
    category: "sports-electronics",
    images: {
      desktop: "/src/assets/images/massage_gun_1782920556763.jpg",
      mobile: "/src/assets/images/massage_gun_1782920556763.jpg"
    }
  },
  {
    id: "water-bottle",
    name: "HM ThermoShield Insulated Water Bottle",
    price: 2450,
    originalPrice: 3500,
    rating: 4.8,
    reviewCount: 88,
    badge: "❄️ Ice Cold",
    description: "Beat Pakistan's punishing 45°C summer heat. Keeps your water ice-cold for up to 24 hours. Double-walled 18/8 food-grade stainless steel with professional sweat-proof powder coating. Essential for hydration during long, blazing cricket days.",
    features: [
      "Double-walled vacuum thermal insulation",
      "Premium 18/8 food-grade stainless steel, BPA-free",
      "Leak-proof straw lid and flex cap included",
      "Sweat-free powder finish for non-slip grip",
      "Wide mouth for easy ice cube insertion"
    ],
    specs: {
      "Capacity": "1000ml (32 oz)",
      "Material": "Double-Wall 18/8 Stainless Steel",
      "Cold Retention": "Up to 24 Hours",
      "Hot Retention": "Up to 12 Hours",
      "Finish": "Textured Anti-Slip Powder Coat"
    },
    category: "sports-electronics",
    images: {
      desktop: "/src/assets/images/insulated_water_bottle_1782922039530.jpg",
      mobile: "/src/assets/images/insulated_water_bottle_1782922039530.jpg"
    }
  },
  {
    id: "resistance-bands",
    name: "HM Apex Heavy-Duty Resistance Bands Set",
    price: 2100,
    originalPrice: 2800,
    rating: 4.7,
    reviewCount: 74,
    badge: "💪 5-in-1 Set",
    description: "Your complete pocket-sized gym. Perfect for quick home workouts, warm-ups before entering the pitch, strength training, and injury rehabilitation. Premium natural latex with anti-snap double layering.",
    features: [
      "100% natural, eco-friendly Malaysian latex",
      "5 distinct resistance levels clearly color-coded",
      "Includes premium mesh carrying pouch",
      "Anti-snap technology with double layering",
      "Comes with a workout instruction guide"
    ],
    specs: {
      "Material": "100% Premium Eco-Friendly Latex",
      "Resistance Range": "5 lbs to 40 lbs of tension",
      "Band Length": "12 inches (30cm) flat loop",
      "Package Includes": "5 Bands, Carry Bag, Workout Guide",
      "Suitability": "Strength, Pilates, Injury Recovery"
    },
    category: "gear",
    images: {
      desktop: "/src/assets/images/resistance_bands_poster_1782970561860.jpg",
      mobile: "/src/assets/images/resistance_bands_poster_1782970561860.jpg"
    }
  },
  {
    id: "wireless-earbuds",
    name: "HM Premium Wireless Earbuds (Sports Edition)",
    price: 3450,
    originalPrice: 4950,
    rating: 4.8,
    reviewCount: 39,
    badge: "⚡ Low Latency",
    description: "Engineered specifically for athletes and sports enthusiasts. Sweatproof silicone ear hooks keep them completely locked in during high-intensity workouts. Featuring an ultra-low latency chipset, perfect for listening to ball-by-ball live cricket match commentary with zero delay. Premium deep bass drivers to power your heavy lifting.",
    features: [
      "Sweatproof and splashproof construction built for extreme summer workouts",
      "Ultra-low latency connection (<40ms) optimized for live cricket match audio",
      "Secure-fit silicone ear hooks to prevent falling out during running and jumping",
      "Up to 36 hours of total playback time with the compact charging case",
      "Smart touch controls with instant voice assistant triggers"
    ],
    specs: {
      "Water Resistance": "IPX7 Sweatproof & Waterproof",
      "Latency": "40ms Ultra-Low Latency Mode",
      "Bluetooth Version": "Bluetooth 5.3 Pro",
      "Battery Backup": "8 Hours (Earbuds) + 28 Hours (Case)",
      "Driver Unit": "12mm Graphene Dynamic Bass Driver"
    },
    category: "lifestyle-electronics",
    images: {
      desktop: "/src/assets/images/y60_earbuds_1782990079128.jpg",
      mobile: "/src/assets/images/y60_earbuds_1782990079128.jpg"
    }
  },
  {
    id: "cricket-bat",
    name: "HM Gold Edition Professional Full Cricket Kit",
    price: 18000,
    originalPrice: 24000,
    rating: 4.9,
    reviewCount: 86,
    badge: "🏏 Complete Professional Kit",
    description: "The ultimate, comprehensive professional cricket bundle designed for high-performance league matches and professional cricketers. This elite kit includes the Grade-1 English Willow HM Gold Edition Bat, ultra-lightweight high-density foam batting pads, pro-level split-finger leather gloves, a premium Alum-tanned leather cricket ball, an ergonomic helmet with high-impact steel grille, and a high-capacity heavy-duty wheelie gear bag with customizable storage compartments.",
    features: [
      "HM Gold Edition Grade-1 English Willow bat with a massive 40mm sweet-spot edge",
      "Ultra-lightweight molded high-density foam batting pads with absolute impact protection",
      "Professional split-finger premium sheepskin leather batting gloves for superior grip and airflow",
      "Heavy-duty deluxe wheelie gear bag with double-reinforced stitching and a dedicated bat sleeve",
      "High-strength protective cricket helmet with an adjustable steel grille face guard"
    ],
    specs: {
      "Complete Bundle": "Bat, Pads, Gloves, Helmet, Ball, Thigh/Arm Guards, and Deluxe Wheelie Bag",
      "Willow Quality": "Grade-1 selected English Willow (7-9 clean grains)",
      "Batting Pads": "Ultra-lightweight High Density foam (Test match grade)",
      "Batting Gloves": "Split-finger sheepskin leather with triple-layer protection",
      "Helmet": "High-impact ABS shell with a steel face grille",
      "Kit Bag": "1680D heavy-duty ballistic nylon with built-in rolling wheels"
    },
    category: "gear",
    images: {
      desktop: "/src/assets/images/premium_cricket_kit_1782990832147.jpg",
      mobile: "/src/assets/images/premium_cricket_kit_1782990832147.jpg"
    }
  },
  {
    id: "lint-remover",
    name: "HM Premium Activewear Lint Remover",
    price: 1950,
    originalPrice: 2800,
    rating: 4.8,
    reviewCount: 28,
    badge: "✨ Fabric Care",
    description: "Keep your athletic hoodies, sports sweaters, and activewear looking completely pristine. Features an elite 8000 RPM rotary motor with a 3-blade system behind an ultra-thin protective steel mesh to safely eliminate lint, fluff, and pilling without damaging your premium garments. USB-C rechargeable and lightweight for gym bags.",
    features: [
      "High-speed 8000 RPM precision motor for effortless lint removal",
      "0.35mm ultra-thin stainless steel mesh protects garments from cuts or friction",
      "Perfect for athletic hoodies, woolen sports socks, and fleece tracksuits",
      "Cordless and ergonomic design with long-lasting USB-C rechargeable battery",
      "Translucent easy-to-empty lint collection chamber"
    ],
    specs: {
      "Motor Speed": "8000 RPM Dynamic Shaving",
      "Blade Type": "3-Blade Precision Rotary System",
      "Power Source": "1200mAh USB-C Rechargeable Battery",
      "Mesh Guard": "Stainless Steel Honeycomb Mesh",
      "Safety Switch": "Blade auto-stops when cover is loosened"
    },
    category: "lifestyle-electronics",
    images: {
      desktop: "/src/assets/images/premium_lint_remover_1782990352685.jpg",
      mobile: "/src/assets/images/premium_lint_remover_1782990352685.jpg"
    }
  }
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productBought: string;
  date: string;
  verified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Asad Malik",
    location: "Lahore, Punjab",
    rating: 5,
    comment: "Excellent quality! The HM Massage Gun is a lifesaver after my football matches. The battery literally lasts for days. Best purchase in Pakistan, and I got COD in just 2 days!",
    productBought: "HM Pro Percussion Massage Gun",
    date: "June 12, 2026",
    verified: true
  },
  {
    id: "t2",
    name: "Zainab Raza",
    location: "Karachi, Sindh",
    rating: 5,
    comment: "Highly impressed with the Insulated Water Bottle. Kept my water chilled for a full afternoon outdoor workout in Karachi's heat. Zero leakage and looks super athletic. Worth every Rupee!",
    productBought: "HM ThermoShield Insulated Water Bottle",
    date: "June 25, 2026",
    verified: true
  },
  {
    id: "t3",
    name: "Major Haris",
    location: "Rawalpindi, Punjab",
    rating: 5,
    comment: "The training shoes are extremely comfortable and lightweight. The NitroGlide sole has excellent response on the treadmill and during squats. Fast delivery to Rawalpindi Cantonment.",
    productBought: "HM NitroGlide Ultra Training Shoes",
    date: "May 18, 2026",
    verified: true
  },
  {
    id: "t4",
    name: "Babar Jamil",
    location: "Faisalabad, Punjab",
    rating: 5,
    comment: "Being a regular batsman, finding good grip is difficult in the summer. These diamond wave grips are outstanding. Incredible tactile feel and they don't wear out easily. Highly recommended to all tape-ball and hard-ball players!",
    productBought: "HM Cricket Bat Diamond Wave Grip (Pack of 3)",
    date: "June 05, 2026",
    verified: true
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What are your delivery times across Pakistan?",
    answer: "We deliver nationwide! Standard shipping takes 2 to 4 working days to major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad) and 3 to 5 working days to outer districts. All orders are packed securely in damage-proof boxes."
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer: "Yes, Cash on Delivery is our primary payment method and is available on 100% of orders across Pakistan with free or highly subsidised shipping rates."
  },
  {
    question: "How can I pay via EasyPaisa or JazzCash?",
    answer: "When filling out the checkout form, select 'EasyPaisa/JazzCash' as your payment method. Once you submit the order, our system will provide our official mobile account details. You can transfer the amount and easily send us the screenshot via our quick-link WhatsApp button to confirm your dispatch instantly."
  },
  {
    question: "Do you offer a warranty or returns?",
    answer: "Absolutely. We offer a 7-day hassle-free replacement warranty for any manufacturing defects or transit damage. Simply contact us via WhatsApp with your order summary, and we will arrange a return or replacement free of cost."
  },
  {
    question: "How can I quickly confirm my order on WhatsApp?",
    answer: "Once you click 'Place Order', you will be shown an Order Confirmation screen. From there, click the 'Confirm via WhatsApp' button. It will generate a pre-filled WhatsApp message with your name, phone, city, and items ordered, sending it straight to our dispatch team for high-priority handling."
  }
];

export const BENEFITS = [
  {
    id: "b1",
    title: "Nationwide Delivery",
    desc: "Speedy dispatch directly to your doorstep in 2-4 days across Pakistan.",
    icon: "Truck"
  },
  {
    id: "b2",
    title: "Cash on Delivery",
    desc: "Pay securely in cash only when your product arrives at your home.",
    icon: "Banknote"
  },
  {
    id: "b3",
    title: "7-Day Easy Returns",
    desc: "Not satisfied? We provide frictionless replacements and easy refunds.",
    icon: "RotateCcw"
  },
  {
    id: "b4",
    title: "100% Original Products",
    desc: "Premium grade raw materials and strict quality checks on all fitness items.",
    icon: "ShieldCheck"
  }
];
