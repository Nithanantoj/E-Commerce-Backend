const express = require('express');
const mongoose = require('mongoose');
const Productroutes = require('./Routes/productRoutes')
const Userroutes = require('./Routes/userRoutes')
const Cartroutes = require('./Routes/cartRoutes')
const Orderroutes = require('./Routes/orderRoutes')
const bodyParser = require('body-parser');
const cors = require('cors')

require("dotenv").config();


const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb+srv://nithanantoj2022cse:anto12345@cluster0.ua76ums.mongodb.net/ecommerse")
.then(() => console.log('Connected to MongoDB'));

app.set("view engine", "ejs");

app.use("/product", Productroutes)
app.use("/user", Userroutes)
app.use("/cart", Cartroutes)
app.use("/order", Orderroutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})