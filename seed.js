 const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  // CLOTHING
  { name: "College Casual Fleece Hoodie", description: "Soft pullover hoodie.", price: 899, category: "Clothing", stock: 25, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
  { name: "Cotton Polo T-Shirt", description: "Smart casual solid polo neck t-shirt.", price: 499, category: "Clothing", stock: 50, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500" },
  { name: "Aesthetic Baseball Cap", description: "Adjustable cotton sports cap.", price: 299, category: "Clothing", stock: 45, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" },
  { name: "Casual Denim Jacket", description: "Classic blue denim jacket.", price: 1299, category: "Clothing", stock: 20, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
  { name: "Half-Sleeve Casual Plain Shirt", description: "Lightweight cotton shirt.", price: 649, category: "Clothing", stock: 30, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
  { name: "Casual Beanie Cap", description: "Soft stretchable knitted beanie cap.", price: 249, category: "Clothing", stock: 40, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500" },

  // STATIONERY
  { name: "Spiral Notebook Set (Pack of 3)", description: "200-page ruled spiral notebooks.", price: 249, category: "Stationery", stock: 60, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { name: "Smooth Gel Ball Pen Set (Pack of 10)", description: "0.7mm quick-dry waterproof gel ink pens.", price: 150, category: "Stationery", stock: 120, image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500" },
  { name: "12-Color Acrylic Artist Paint Set", description: "Water-based acrylic colors with brushes.", price: 349, category: "Stationery", stock: 40, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500" },
  { name: "Steel & Transparent Ruler Set (30cm)", description: "Durable stainless steel scales.", price: 99, category: "Stationery", stock: 100, image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500" },
  { name: "HB Wooden Pencil Pack (Pack of 10)", description: "Dark graphite writing pencils.", price: 120, category: "Stationery", stock: 90, image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500" },
  { name: "Pastel Highlighters (Pack of 6)", description: "Pastel colors for textbook notes.", price: 180, category: "Stationery", stock: 80, image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500" },
  { name: "Wooden Study Desk Organizer", description: "Organizing stand for pens and notes.", price: 399, category: "Stationery", stock: 45, image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500" },

  // ELECTRONICS
  { name: "65W Multi-Port Fast Charger Adapter", description: "GaN fast wall charger with Type-C.", price: 899, category: "Electronics", stock: 50, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500" },
  { name: "Braided Type-C Fast Charging Cable (2M)", description: "Tangle-free fast charging cable.", price: 299, category: "Electronics", stock: 80, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500" },
  { name: "Wireless ANC Headphones", description: "Bluetooth noise isolation headphones.", price: 1499, category: "Electronics", stock: 25, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { name: "Ergonomic Aluminium Laptop Stand", description: "Foldable height-adjustable riser.", price: 699, category: "Electronics", stock: 30, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" },
  { name: "64GB High Speed USB Flash Drive", description: "Pen drive for storing projects and code.", price: 449, category: "Electronics", stock: 70, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500" },
  { name: "Wireless Ergonomic Optical Mouse", description: "Silent click 2.4GHz wireless mouse.", price: 399, category: "Electronics", stock: 60, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },

  // SPORTS
  { name: "Professional Size 5 Football", description: "Training football for practice matches.", price: 699, category: "Sports", stock: 35, image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500" },
  { name: "Classic Wooden Carrom Board Set", description: "Wooden carrom board with coins & striker.", price: 1199, category: "Sports", stock: 20, image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500" },
  { name: "Kashmir Willow Cricket Bat", description: "Lightweight cricket bat with rubber grip.", price: 999, category: "Sports", stock: 25, image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500" },
  { name: "Badminton Racket Set (Pack of 2)", description: "Badminton rackets with carrying cover.", price: 749, category: "Sports", stock: 30, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500" },
  { name: "Standard Basketball (Size 7)", description: "High-grip rubber outdoor basketball.", price: 799, category: "Sports", stock: 28, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500" },

  // BOOKS
  { name: "Data Structures & Algorithms in C++", description: "Guide to mastering DSA concepts.", price: 599, category: "Books", stock: 45, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500" },
  { name: "Python Programming: Beginner's Guide", description: "Learn Python from scratch.", price: 499, category: "Books", stock: 50, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500" },
  { name: "Fundamentals of IT & Software (FITS)", description: "Textbook covering computer basics.", price: 399, category: "Books", stock: 35, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500" },

  // HOME
  { name: "Mini Artificial Succulent Desk Plants", description: "Small fake succulent pots for room decor.", price: 349, category: "Home", stock: 40, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500" },
  { name: "Insulated Stainless Steel Water Bottle", description: "750ml vacuum insulated thermos flask.", price: 399, category: "Home", stock: 50, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
  { name: "Aesthetic Ceramic Coffee Mug", description: "350ml microwave safe ceramic mug.", price: 249, category: "Home", stock: 60, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500" },
  { name: "Rechargeable LED Study Desk Lamp", description: "Touch switch lamp with flexible neck.", price: 549, category: "Home", stock: 35, image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500" },
  { name: "RGB Neon Strip Light (5 Meters)", description: "Smart LED strip lights with remote.", price: 499, category: "Home", stock: 55, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("SUCCESS: Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database error:", error);
    process.exit(1);
  }
};

seedDB();