const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const {CourseRoute} = require("./routes/Course");
const {PaymentRoute} = require("./routes/Payment");
const {ProfileRoute} = require("./routes/Profile");
const {UserRoute} = require("./routes/User");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {CloudinaryConnect} = require("./config/cloudinary");
const fileupload = require("express-fileupload");

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credential: true
    })
)

app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

CloudinaryConnect();

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/Profile", ProfileRoute);
app.use("/api/v1/Payment", PaymentRoute);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is running..................'
    })
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});


