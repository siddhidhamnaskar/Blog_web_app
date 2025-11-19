const express = require("express");
const connection = require("./Config/db");
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();
const PORT = process.env.PORT || 3033;

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const photoRoutes = require('./routes/photoRoutes');

app.use('/', authRoutes);
app.use('/', blogRoutes);
app.use('/', photoRoutes);

app.listen(PORT, () => {
    try {
        connection();
        console.log(`Server is running on ${PORT}`);
    } catch (err) {
        console.log("Error");
    }
});

