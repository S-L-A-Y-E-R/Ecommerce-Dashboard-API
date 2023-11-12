const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const storeRoutes = require("./routes/storeRoutes");
const billboardRoutes = require("./routes/billboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const colorRoutes = require("./routes/colorRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

//Enable outsource proxies
app.set("trust proxy", true);

//Allow cors for all domains
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//Set security http headers
app.use(helmet());

//Use morgan logger in the develpment
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//We used the webhook checkout here, because it needs a body of type raw not JSON
// app.post('/webhook-checkout',
//     bodyParser.raw({ type: 'application/json' }),
//     webhookCheckout
// );

//Limit data incoming from the request body
app.use(express.json());

//Data sanitization agains noSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss attacks
app.use(xssClean());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "difficulty",
      "price",
      "maxGroupSize",
    ],
  })
);

//Compress all text sent in the response to the client
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

//Global resources
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/billboards", billboardRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/sizes", sizeRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Handle requests from wrong urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
