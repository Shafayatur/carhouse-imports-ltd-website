export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  price?: string;
  image: string;
  specs?: string;
  details?: string;
  color?: string;
  description?: string;
  gallery?: string[];
  category: "Hypercar" | "GT" | "Heritage" | "Off-Road" | "Track";
  technicalSpecs?: {
    engine?: string;
    transmission?: string;
    power?: string;
    torque?: string;
    acceleration?: string; // 0-100 km/h
    topSpeed?: string;
    weight?: string;
    drivetrain?: string;
  };
  features?: string[];
}

export const ALL_CARS: Car[] = [
  {
    id: "p1",
    name: "911 GT3 RS",
    brand: "Porsche",
    year: 2024,
    price: "$275,000",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670",
    specs: "4.0L Flat-6 • 518 HP",
    description: "The 911 GT3 RS is designed for uncompromised performance. With its atmospheric 4.0-liter six-cylinder boxer engine and sophisticated aerodynamics, it brings track technology to the road.",
    color: "Guard Red",
    category: "Track",
    technicalSpecs: {
      engine: "4.0L Naturally Aspirated Flat-6",
      transmission: "7-Speed Porsche Doppelkupplung (PDK)",
      power: "518 hp @ 8,500 rpm",
      torque: "342 lb-ft @ 6,300 rpm",
      acceleration: "3.2 seconds",
      topSpeed: "184 mph",
      weight: "3,153 lbs",
      drivetrain: "Rear-Wheel Drive"
    },
    features: [
      "DRS (Drag Reduction System)",
      "Clubman Package",
      "Carbon Fibre Reinforced Plastic (CFRP) doors",
      "Magnesium wheels"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3e2c?q=80&w=2670"
    ]
  },
  {
    id: "p2",
    name: "SF90 Stradale",
    brand: "Ferrari",
    year: 2023,
    price: "$524,000",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    specs: "4.0L V8 Hybrid • 986 HP",
    description: "A new era of performance. The SF90 Stradale is the first ever Ferrari to feature Plug-in Hybrid Electric Vehicle architecture, seeing the internal combustion engine integrated with three electric motors.",
    color: "Rosso Corsa",
    category: "Hypercar",
    technicalSpecs: {
      engine: "4.0L V8 Twin-Turbo + 3 Electric Motors",
      transmission: "8-Speed Dual-Clutch",
      power: "986 hp (Combined)",
      torque: "590 lb-ft",
      acceleration: "2.5 seconds",
      topSpeed: "211 mph",
      weight: "3,461 lbs",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      "Assetto Fiorano Package",
      "Carbon dynamic spoiler",
      "E-manettino selection",
      "Side Slip Control 6.0"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69d88?q=80&w=2670"
    ]
  },
  {
    id: "p3",
    name: "DB11 Volante",
    brand: "Aston Martin",
    year: 2022,
    price: "$232,000",
    image: "https://images.unsplash.com/photo-1603584173870-7f3948ab8923?q=80&w=2670",
    specs: "4.0L V8 Bi-Turbo • 503 HP",
    description: "The DB11 Volante is the ultimate open-top Sports GT. Beautifully proportioned and expertly engineered, it offers a sensory experience unlike any other.",
    color: "Skyfall Silver",
    category: "GT",
    technicalSpecs: {
      engine: "4.0L V8 Bi-Turbo",
      transmission: "8-Speed Automatic",
      power: "503 hp @ 6,000 rpm",
      torque: "513 lb-ft",
      acceleration: "4.1 seconds",
      topSpeed: "187 mph",
      weight: "4,134 lbs",
      drivetrain: "Rear-Wheel Drive"
    }
  },
  {
    id: "p4",
    name: "Revuelto",
    brand: "Lamborghini",
    year: 2024,
    price: "$608,000",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2670",
    specs: "6.5L V12 Hybrid • 1001 HP",
    description: "The Revuelto defines a new paradigm in terms of performance, sportiness and driving pleasure from its unprecedented new architecture and innovative design.",
    color: "Arancio Apodis",
    category: "Hypercar",
    technicalSpecs: {
      engine: "6.5L Naturally Aspirated V12 + 3 Electric Motors",
      transmission: "8-Speed Dual-Clutch",
      power: "1,001 hp",
      torque: "535 lb-ft (Engine) + Electric Torque",
      acceleration: "2.5 seconds",
      topSpeed: "217 mph",
      weight: "3,906 lbs",
      drivetrain: "All-Wheel Drive"
    }
  },
  {
    id: "p5",
    name: "Cullinan BB",
    brand: "Rolls-Royce",
    year: 2024,
    price: "$450,000",
    image: "https://images.unsplash.com/photo-1635773054018-029050074303?q=80&w=2576",
    specs: "6.75L V12 • 600 HP",
    description: "Black Badge is for the innovators, the trailblazers, the rule-breakers. It is a more potent, more rebellious expression of the world's most luxurious SUV.",
    color: "Black Diamond",
    category: "Off-Road"
  },
  {
    id: "p6",
    name: "F8 Tributo",
    brand: "Ferrari",
    year: 2023,
    price: "$320,000",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69d88?q=80&w=2670",
    specs: "3.9L V8 Twin-Turbo • 710 HP",
    description: "The F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse's classic two-seater berlina.",
    color: "Giallo Modena",
    category: "GT",
    technicalSpecs: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      power: "710 hp @ 8,000 rpm",
      torque: "567 lb-ft @ 3,250 rpm",
      acceleration: "2.9 seconds",
      topSpeed: "211 mph",
      weight: "3,164 lbs",
      drivetrain: "Rear-Wheel Drive"
    }
  },
  {
    id: "g1",
    name: "Cullinan Black Badge",
    brand: "Rolls-Royce",
    year: 2024,
    price: "$450,000",
    image: "https://images.unsplash.com/photo-1635773054018-029050074303?q=80&w=2576",
    specs: "6.75L V12 • 600 HP",
    description: "The Black Badge is the darker, more rebellious alter ego of the Cullinan. A masterpiece of luxury engineering.",
    color: "Black Diamond",
    category: "Off-Road",
    technicalSpecs: {
      engine: "6.75L Twin-Turbo V12",
      transmission: "8-Speed Automatic",
      power: "600 hp",
      torque: "664 lb-ft",
      acceleration: "4.5 seconds",
      topSpeed: "155 mph",
      weight: "6,063 lbs",
      drivetrain: "All-Wheel Drive"
    }
  },
  {
    id: "g2",
    name: "DBS Superleggera",
    brand: "Aston Martin",
    year: 2023,
    price: "$335,000",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670",
    specs: "5.2L V12 Twin-Turbo • 715 HP",
    description: "Elegance meets brute force. The DBS Superleggera is Aston Martin's ultimate grand tourer.",
    color: "Zaffre Blue",
    category: "GT",
    technicalSpecs: {
      engine: "5.2L Twin-Turbo V12",
      transmission: "8-Speed Automatic",
      power: "715 hp",
      torque: "663 lb-ft @ 1,800 rpm",
      acceleration: "3.4 seconds",
      topSpeed: "211 mph",
      weight: "4,068 lbs",
      drivetrain: "Rear-Wheel Drive"
    }
  },
  {
    id: "g3",
    name: "G63 AMG Brabus",
    brand: "Mercedes-Benz",
    year: 2024,
    price: "$380,000",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2670",
    specs: "4.0L V8 Twin-Turbo • 800 HP",
    description: "The iconic G-Class refined by Brabus. A statement of power and presence.",
    color: "Obsidian Black",
    category: "Off-Road",
    technicalSpecs: {
      engine: "4.0L Bi-Turbo V8 Brabus Tuned",
      transmission: "9-Speed Automatic",
      power: "800 hp",
      torque: "737 lb-ft",
      acceleration: "4.1 seconds",
      topSpeed: "149 mph",
      weight: "5,600 lbs",
      drivetrain: "All-Wheel Drive"
    },
    features: [
      "Brabus WIDESTAR bodywork",
      "Brabus Monoblock Y Platinum Edition wheels",
      "Brabus Masterpiece interior",
      "Brabus PowerXtra B40S-800"
    ]
  },
  {
    id: "v1",
    name: "Daytona SP3",
    brand: "Ferrari",
    year: 2024,
    price: "Inquire",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    specs: "6.5L V12 • 829 HP",
    description: "The Daytona SP3 pays homage to the mid-rear-engined Ferrari V12 prototypes. A masterpiece of automotive art.",
    color: "Rosso Libano",
    category: "Heritage",
    technicalSpecs: {
      engine: "6.5L Naturally Aspirated V12",
      transmission: "7-Speed Sequential",
      power: "829 hp @ 9,250 rpm",
      torque: "514 lb-ft @ 7,250 rpm",
      acceleration: "2.85 seconds",
      topSpeed: "211 mph",
      weight: "3,274 lbs",
      drivetrain: "Rear-Wheel Drive"
    }
  },
  {
    id: "v2",
    name: "Utopia",
    brand: "Pagani",
    year: 2024,
    price: "Inquire",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670",
    specs: "6.0L V12 Twin-Turbo • 864 HP",
    description: "The Pagani Utopia celebrates the pure connection between driver and machine.",
    color: "Exposed Carbon",
    category: "Hypercar"
  },
  {
    id: "v3",
    name: "Valkyrie",
    brand: "Aston Martin",
    year: 2024,
    price: "Inquire",
    image: "https://images.unsplash.com/photo-1627453401509-f9c3c1393698?q=80&w=2670",
    specs: "6.5L V12 Hybrid • 1160 HP",
    description: "Formula One technology for the road. The ultimate hypercar.",
    color: "British Racing Green",
    category: "Track",
    technicalSpecs: {
      engine: "6.5L Naturally Aspirated V12 Hybrid",
      transmission: "7-Speed Sequential",
      power: "1,160 hp",
      torque: "664 lb-ft",
      acceleration: "2.5 seconds",
      topSpeed: "250 mph",
      weight: "2,271 lbs",
      drivetrain: "Rear-Wheel Drive"
    },
    features: [
      "F1-inspired aerodynamics",
      "KERS hybrid system",
      "Carbon fibre tub",
      "Active suspension"
    ]
  }
];
