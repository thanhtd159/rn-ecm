const fs = require("fs");

const products = [];

const categories = ["phone", "laptop", "tablet", "accessory"];

for (let i = 1; i <= 1000; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    stock: Math.floor(Math.random() * 100),
    rating: 0,
  });
}

const db = require("../db.json");

db.products = products;

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

console.log("Seeded 1000 products");
