// THIS FILE INITIATLIZES THE EXPRESS SERVER AND THE MAIN ROUTES TO OUR DB TABLES

const express = require("express");
const path = require("path");
const { client } = require("../db/index.js");

const app = express();
app.use(express.json());
client.connect();

const baseQuery = `/api/`;

app.get(baseQuery, (req, res) => [
  res.json({
    success: true,
  }),
]);

// Requiring each of our routes - UPDATE AS THESE ARE COMPLETED
// app.use(baseQuery + "users", require("../users"));
app.use(baseQuery + "products", require("./products.js"));
app.use(baseQuery + "orders", require("./orders.js));


app.listen(8080, () => {
  console.log("App is running at port 8080");
});
