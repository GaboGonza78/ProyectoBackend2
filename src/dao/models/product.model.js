import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  status: { type: Boolean, default: true },
  thumbnails: [String],
}, {
  timestamps: true,
});

export const ProductModel = mongoose.model('Product', productSchema);
