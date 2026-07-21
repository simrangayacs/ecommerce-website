const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Bluetooth headphones with noise cancellation",
    price: 1999,
    category: "Electronics",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 499,
    category: "Clothing",
    stock: 50,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "Ruled Notebook (Copy)",
    description: "200 pages long ruled notebook, soft cover",
    price: 60,
    category: "Stationery",
    stock: 100,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
  },
  {
    name: "File Folder (Set of 5)",
    description: "L-shape transparent file folders for documents",
    price: 150,
    category: "Stationery",
    stock: 60,
    image: "https://images.unsplash.com/photo-1568205612837-017257d2310a",
  },
  {
    name: "Ball Pen (Pack of 10)",
    description: "Smooth writing blue ball pens",
    price: 80,
    category: "Stationery",
    stock: 120,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc36b5c",
  },
  {
    name: "Geometry Box",
    description: "Complete geometry set with compass, scale, protractor",
    price: 120,
    category: "Stationery",
    stock: 40,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
  },
  {
    name: "A4 Sheets (500 pack)",
    description: "White A4 size printing/writing paper",
    price: 300,
    category: "Stationery",
    stock: 30,
    image: "https://images.unsplash.com/photo-1568871823053-2c6d5eb96bd6",
  },
  // yahan aur products add kar sakte ho isi format me
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.insertMany(sampleProducts);
    console.log("Products daal diye gaye");
    process.exit();
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
}

seedDB();