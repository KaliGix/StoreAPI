const express = require('express'); // create a server using express framework
const axios = require('axios'); // make HTTP requests to external APIs
const cors = require('cors'); // enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
const path = require('path'); // built-in Node.js module for handling file paths

const app= express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// ======================
// API Routes 
// ======================

//Get all products 
app.get("/api/products", async (request, res) => {
    try{
        const response = await axios.get("https://dummyjson.com/products");

        res.json(response.data);
    }  catch(error){
         console.error("Error fetching products:", error.message);
         res.status(500).json({ error: "An error occurred while fetching products" });
    }
});

// Get a single product by ID
app.get("/api/products/:id", async (request , res) => {

    try {
        const { id } = request.params;

        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        res.json(response.data);
        
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});

// Search products by query
app.get("/api/products/search", async (request, res) => {

    try {
        const { query } = request.query;
        const response = await axios.get(`https://dummyjson.com/products/`);

        const filteredProducts = response.data.products.filter(product => 
            product.title.toLowerCase().includes(query.toLocaleLowerCase())
        );

        res.json(filteredProducts);
    } catch (error) {
        console.error(`Error searching products with query "${query}":`, error.message);
        res.status(500).json({ error: "An error occurred while searching for products" });
    }
});

// Serve frontend files
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.htm"));
});


//=======================
// Start the server
//=======================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});