import Product from '../models/Product.js';
import Brand from '../models/Brand.js';
import Category from '../models/Category.js';
import createError from 'http-errors';

export const create = async (payload) => {
  if (payload.brand) {
    const b = await Brand.findById(payload.brand);
    if (!b) throw createError(400, 'Invalid brand');
  }
  if (payload.category) {
    const c = await Category.findById(payload.category);
    if (!c) throw createError(400, 'Invalid category');
  }
  return Product.create(payload);
};

export const list = async ({ q, brand, category, page=1, limit=20 }) => {
  const filter = { isActive: true };
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (brand) filter.brand = brand;
  if (category) filter.category = category;
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find(filter).populate('brand category').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter)
  ]);
  return { items, total, page, pages: Math.ceil(total / limit) };
};
