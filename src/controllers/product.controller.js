import { z } from 'zod';
import * as productService from '../services/product.service.js';

const createSchema = z.object({
  body: z.object({
    title: z.string(),
    slug: z.string(),
    brand: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).default([]),
    price: z.number(),
    mrp: z.number().optional(),
    stock: z.number().default(0),
    attributes: z.record(z.string()).optional()
  })
});
const listSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional()
  })
});

export const create = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (e) { next(e); }
};
export const list = async (req, res, next) => {
  try {
    const data = await productService.list(req.query);
    res.json(data);
  } catch (e) { next(e); }
};

export const validators = { createSchema, listSchema };

