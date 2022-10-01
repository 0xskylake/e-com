import env from "dotenv";
import path from "path";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


app.use(express.json());

env.config();
connectDB();

app.use((req, res, next) => { console.log(req.originalUrl); next(); });

app.get("/", (req, res) => { res.send("eCom is running"); });

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// static path for upload folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`));