const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = createOne(Order);

exports.getAllOrders = getAll(Order);

exports.getOneOrder = getOne(Order);

exports.updateOrder = updateOne(Order);

exports.deleteOrder = deleteOne(Order);

exports.getEmptyOrder = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: [],
  });
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const productIds = req.body.productIds;
  const products = await Product.find({ _id: { $in: productIds } });

  const order = await Order.create({
    storeId: req.body.storeId,
    isPaid: false,
    orderItems: productIds.map((productId) => {
      return { productId };
    }),
  });

  const line_items = [];

  products.forEach((product) => {
    line_items.push({
      price_data: {
        currency: "usd",
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
        },
      },
      quantity: 1,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });
  console.log(session);

  res.status(200).json({
    status: "success",
    session,
  });
});

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  /*We need the signature and the secret to validate 
  the data in the body and make the process super secure*/
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  const session = event.data.object;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    // console.log(session);
    await Order.findByIdAndUpdate(
      session.metadata.orderId,
      {
        isPaid: true,
        address: addressString,
        phone: session.customer_details.phone || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    recieved: true,
  });
});
