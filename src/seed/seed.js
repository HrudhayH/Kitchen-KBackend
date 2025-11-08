import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../models/User.js';
import Brand from '../models/Brand.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { ROLES } from '../constants/roles.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Brand.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create Users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@kitchenkettles.com',
        role: ROLES.ADMIN,
        isActive: true,
        addresses: [{
          name: 'Admin User',
          phone: '+91-9876543210',
          line1: '123 Admin Street',
          line2: 'Admin Area',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          pincode: '400001',
          isDefault: true
        }]
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        role: ROLES.USER,
        isActive: true,
        addresses: [{
          name: 'John Doe',
          phone: '+91-9876543211',
          line1: '456 User Lane',
          line2: 'Sector 5',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          pincode: '110001',
          isDefault: true
        }]
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: ROLES.USER,
        isActive: true,
        addresses: [{
          name: 'Jane Smith',
          phone: '+91-9876543212',
          line1: '789 Customer Road',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          pincode: '560001',
          isDefault: true
        }]
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Create Brands
    const brands = await Brand.insertMany([
      {
        name: 'Kitchen Classics',
        slug: 'kitchen-classics',
        logoUrl: 'https://via.placeholder.com/150x50?text=Kitchen+Classics'
      },
      {
        name: 'Modern Chef',
        slug: 'modern-chef',
        logoUrl: 'https://via.placeholder.com/150x50?text=Modern+Chef'
      },
      {
        name: 'Premium Cookware',
        slug: 'premium-cookware',
        logoUrl: 'https://via.placeholder.com/150x50?text=Premium+Cookware'
      },
      {
        name: 'Home Essentials',
        slug: 'home-essentials'
      }
    ]);
    console.log(`Created ${brands.length} brands`);

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: 'Cookware',
        slug: 'cookware',
        parent: null
      },
      {
        name: 'Appliances',
        slug: 'appliances',
        parent: null
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        parent: null
      },
      {
        name: 'Pots & Pans',
        slug: 'pots-pans',
        parent: null
      },
      {
        name: 'Storage',
        slug: 'storage',
        parent: null
      }
    ]);
    console.log(`Created ${categories.length} categories`);

    // Create Products
    const products = await Product.insertMany([
      {
        title: 'Stainless Steel Pressure Cooker',
        slug: 'stainless-steel-pressure-cooker',
        brand: brands[0]._id,
        category: categories[0]._id,
        description: 'High-quality stainless steel pressure cooker with safety features. Perfect for everyday cooking.',
        images: [
          'https://via.placeholder.com/400x400?text=Pressure+Cooker+1',
          'https://via.placeholder.com/400x400?text=Pressure+Cooker+2'
        ],
        price: 2499,
        mrp: 3499,
        stock: 50,
        attributes: new Map([
          ['capacity', '5 Liters'],
          ['material', 'Stainless Steel'],
          ['warranty', '2 Years']
        ]),
        ratingAvg: 4.5,
        ratingCount: 24,
        isActive: true
      },
      {
        title: 'Non-Stick Frying Pan Set',
        slug: 'non-stick-frying-pan-set',
        brand: brands[1]._id,
        category: categories[3]._id,
        description: 'Set of 3 non-stick frying pans in different sizes. PFOA-free coating for healthy cooking.',
        images: [
          'https://via.placeholder.com/400x400?text=Frying+Pan+Set+1',
          'https://via.placeholder.com/400x400?text=Frying+Pan+Set+2',
          'https://via.placeholder.com/400x400?text=Frying+Pan+Set+3'
        ],
        price: 1899,
        mrp: 2799,
        stock: 35,
        attributes: new Map([
          ['sizes', '20cm, 24cm, 28cm'],
          ['coating', 'Non-stick'],
          ['material', 'Aluminum'],
          ['warranty', '1 Year']
        ]),
        ratingAvg: 4.2,
        ratingCount: 18,
        isActive: true
      },
      {
        title: 'Electric Rice Cooker',
        slug: 'electric-rice-cooker',
        brand: brands[1]._id,
        category: categories[1]._id,
        description: 'Automatic electric rice cooker with keep-warm function. Cooks perfect rice every time.',
        images: [
          'https://via.placeholder.com/400x400?text=Rice+Cooker+1',
          'https://via.placeholder.com/400x400?text=Rice+Cooker+2'
        ],
        price: 3299,
        mrp: 4599,
        stock: 20,
        attributes: new Map([
          ['capacity', '1.8 Liters'],
          ['power', '700W'],
          ['type', 'Electric'],
          ['warranty', '2 Years']
        ]),
        ratingAvg: 4.7,
        ratingCount: 32,
        isActive: true
      },
      {
        title: 'Glass Food Storage Containers',
        slug: 'glass-food-storage-containers',
        brand: brands[3]._id,
        category: categories[4]._id,
        description: 'Set of 6 borosilicate glass containers with airtight lids. Microwave and dishwasher safe.',
        images: [
          'https://via.placeholder.com/400x400?text=Glass+Containers+1',
          'https://via.placeholder.com/400x400?text=Glass+Containers+2'
        ],
        price: 1599,
        mrp: 2299,
        stock: 45,
        attributes: new Map([
          ['material', 'Borosilicate Glass'],
          ['count', '6 pieces'],
          ['sizes', 'Various'],
          ['features', 'Airtight, Microwave Safe']
        ]),
        ratingAvg: 4.4,
        ratingCount: 15,
        isActive: true
      },
      {
        title: 'Professional Chef Knife',
        slug: 'professional-chef-knife',
        brand: brands[2]._id,
        category: categories[2]._id,
        description: 'High-carbon steel chef knife with ergonomic handle. Perfect for all cutting tasks.',
        images: [
          'https://via.placeholder.com/400x400?text=Chef+Knife+1'
        ],
        price: 2799,
        mrp: 3899,
        stock: 15,
        attributes: new Map([
          ['length', '8 inches'],
          ['material', 'High-carbon Steel'],
          ['handle', 'Ergonomic'],
          ['warranty', '5 Years']
        ]),
        ratingAvg: 4.8,
        ratingCount: 28,
        isActive: true
      }
    ]);
    console.log(`Created ${products.length} products`);

    // Create sample orders
    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          {
            product: products[0]._id,
            title: products[0].title,
            price: products[0].price,
            qty: 1,
            image: products[0].images[0]
          },
          {
            product: products[3]._id,
            title: products[3].title,
            price: products[3].price,
            qty: 2,
            image: products[3].images[0]
          }
        ],
        subtotal: 4697, // 2499 + (1599 * 2)
        shipping: 0, // Free shipping over 999
        tax: 845, // 18% GST
        total: 5542,
        status: 'delivered',
        shippingAddress: {
          name: 'John Doe',
          phone: '+91-9876543211',
          line1: '456 User Lane',
          line2: 'Sector 5',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          pincode: '110001'
        },
        payment: {
          method: 'COD',
          status: 'success'
        }
      },
      {
        user: users[2]._id,
        items: [
          {
            product: products[1]._id,
            title: products[1].title,
            price: products[1].price,
            qty: 1,
            image: products[1].images[0]
          }
        ],
        subtotal: 1899,
        shipping: 0, // Free shipping over 999
        tax: 342, // 18% GST
        total: 2241,
        status: 'shipped',
        shippingAddress: {
          name: 'Jane Smith',
          phone: '+91-9876543212',
          line1: '789 Customer Road',
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          pincode: '560001'
        },
        payment: {
          method: 'COD',
          status: 'init'
        }
      }
    ]);
    console.log(`Created ${orders.length} orders`);

    // Add products to wishlists
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { wishlist: { $each: [products[2]._id, products[4]._id] } }
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { wishlist: { $each: [products[0]._id, products[1]._id, products[3]._id] } }
    });
    console.log('Added products to user wishlists');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSeed Data Summary:');
    console.log(`- Users: ${users.length} (1 admin, 2 customers)`);
    console.log(`- Brands: ${brands.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Orders: ${orders.length}`);
    console.log(`\nAdmin Login: admin@kitchenkettles.com`);
    console.log(`Customer Logins: john@example.com, jane@example.com`);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();