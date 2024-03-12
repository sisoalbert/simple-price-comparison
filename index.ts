const express = require("express");
const app = express();
const stringSimilarity = require("string-similarity");

// Sample product data
const store1Products = [
  { name: "Whole Milk", price: 2.99 },
  { name: "Organic Apples", price: 3.49 },
  { name: "Cheddar Cheese", price: 4.99 },
];

const store2Products = [
  { name: "Dairy Pure Milk", price: 2.79 },
  { name: "Organic Apples", price: 3.29 },
  { name: "Sharp Cheddar", price: 5.49 },
];

const store3Products = [
  { name: "Milk Whole", price: 2.59 },
  { name: "Apples Organic", price: 3.99 },
  { name: "Cheddar Cheese Block", price: 4.79 },
];

function normalizeString(str: string) {
  return str.toLowerCase().replace(/\W/g, "");
}

function compareTwoStrings(str1: string, str2: string) {
  const normalized1 = normalizeString(str1);
  const normalized2 = normalizeString(str2);
  return stringSimilarity.compareTwoStrings(normalized1, normalized2);
}

app.get(
  "/compare-prices",
  (
    req: { query: { query: string } },
    res: { json: (arg0: { name: string; price: number }[]) => void }
  ) => {
    const query = req.query.query || "";

    const threshold = 0.4; // Adjust this threshold as needed

    const allProducts = [
      ...store1Products,
      ...store2Products,
      ...store3Products,
    ];

    const matchingProducts = allProducts.filter(
      (product) => compareTwoStrings(product.name, query) > threshold
    );
    res.json(matchingProducts);
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
