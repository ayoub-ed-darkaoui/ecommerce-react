require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shop';

const formatOrderForClient = (orderDoc) => {
  const order = orderDoc.toObject ? orderDoc.toObject() : orderDoc;

  return {
    ...order,
    id: order._id ? String(order._id) : order.id,
    created_at: order.createdAt,
    items: Array.isArray(order.items)
      ? order.items.map((item) => ({
        ...item,
        product_name: item.product_name || item.name || '',
      }))
      : [],
  };
};

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Order = require('./models/Order');

app.post('/api/orders', async (req, res) => {
  try {
    const normalizedItems = Array.isArray(req.body.items)
      ? req.body.items.map((item) => ({
        ...item,
        product_name: item.product_name || item.name || '',
      }))
      : [];

    const order = new Order({
      ...req.body,
      items: normalizedItems,
    });

    await order.save();
    res.status(201).json(formatOrderForClient(order));
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders.map(formatOrderForClient));
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
