import mongoose from 'mongoose';

const orderItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  price: Number,
  qty: Number,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItem],
  subtotal: Number,
  shipping: Number,
  tax: Number,
  total: Number,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: {
    name: String, phone: String, line1: String, line2: String, city: String, state: String, country: String, pincode: String
  },
  payment: {
    method: { type: String, default: 'COD' }, // phase 2: gateway
    txnId: String,
    status: { type: String, enum: ['init', 'success', 'failed', 'refunded'], default: 'init' }
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
