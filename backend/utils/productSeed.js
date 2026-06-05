require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { connectDB } = require('../config/db');

const allProducts = [
  // Original 8 Products
  {
    name: 'GlowCare Vitamin C Serum',
    imageUrl: 'https://images.pexels.com/photos/7796511/pexels-photo-7796511.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/7796511/pexels-photo-7796511.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 699,
    category: 'Skincare',
    shortDescription: 'Brightening serum for glowing and even-toned skin.',
    description: 'A lightweight vitamin C serum designed to brighten dull skin, support an even-looking tone, and add daily radiance to your skincare routine.',
    fullDescription: 'A lightweight vitamin C serum designed to brighten dull skin, support an even-looking tone, and add daily radiance to your skincare routine.',
    stock: 42,
    rating: 4.9,
    benefits: ['Helps brighten dull skin', 'Supports even-looking tone', 'Lightweight daily texture', 'Ideal for morning routines']
  },
  {
    name: 'GlowCare Herbal Face Wash',
    imageUrl: 'https://images.pexels.com/photos/4841388/pexels-photo-4841388.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/4841388/pexels-photo-4841388.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 299,
    category: 'Skincare',
    shortDescription: 'Gentle cleanser with aloe vera and neem for fresh skin.',
    description: 'A gentle daily cleanser infused with aloe vera and neem to remove impurities while keeping skin fresh and comfortable.',
    fullDescription: 'A gentle daily cleanser infused with aloe vera and neem to remove impurities while keeping skin fresh and comfortable.',
    stock: 55,
    rating: 4.7,
    benefits: ['Gently cleanses impurities', 'Fresh non-drying feel', 'Aloe and neem inspired care', 'Suitable for everyday use']
  },
  {
    name: 'GlowCare Aloe Moisturizing Cream',
    imageUrl: 'https://images.pexels.com/photos/5911991/pexels-photo-5911991.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5911991/pexels-photo-5911991.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 399,
    category: 'Skincare',
    shortDescription: 'Lightweight daily moisturizer for soft hydrated skin.',
    description: 'A soothing aloe-based cream with a soft finish for daily hydration, comfort, and a healthy-looking glow.',
    fullDescription: 'A soothing aloe-based cream with a soft finish for daily hydration, comfort, and a healthy-looking glow.',
    stock: 38,
    rating: 4.8,
    benefits: ['Supports soft hydrated skin', 'Comfortable daily finish', 'Aloe-inspired soothing care', 'Layers well with sunscreen']
  },
  {
    name: 'GlowCare Sunscreen SPF 50',
    imageUrl: 'https://images.pexels.com/photos/6963149/pexels-photo-6963149.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/6963149/pexels-photo-6963149.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 549,
    category: 'Skincare',
    shortDescription: 'Broad spectrum sunscreen for daily sun protection.',
    description: 'A smooth daily SPF 50 sunscreen created for comfortable broad spectrum protection with a premium skincare feel.',
    fullDescription: 'A smooth daily SPF 50 sunscreen created for comfortable broad spectrum protection with a premium skincare feel.',
    stock: 44,
    rating: 4.8,
    benefits: ['Daily sun protection', 'Smooth skincare finish', 'Great under makeup', 'Lightweight feel']
  },
  {
    name: 'GlowCare Rose Water Toner',
    imageUrl: 'https://images.pexels.com/photos/13946076/pexels-photo-13946076.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/13946076/pexels-photo-13946076.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 249,
    category: 'Skincare',
    shortDescription: 'Refreshing toner that helps tighten pores and hydrate skin.',
    description: 'A refreshing rose water toner for a clean, hydrated feel after cleansing and before serums or moisturizers.',
    fullDescription: 'A refreshing rose water toner for a clean, hydrated feel after cleansing and before serums or moisturizers.',
    stock: 61,
    rating: 4.6,
    benefits: ['Refreshes after cleansing', 'Hydrating toner step', 'Preps skin for serum', 'Soft floral feel']
  },
  {
    name: 'GlowCare Hair Strength Oil',
    imageUrl: 'https://images.pexels.com/photos/13573918/pexels-photo-13573918.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/13573918/pexels-photo-13573918.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 449,
    category: 'Hair Care',
    shortDescription: 'Amla and bhringraj hair oil for stronger roots.',
    description: 'A nourishing pre-wash hair oil inspired by amla and bhringraj rituals to support stronger-looking roots and shine.',
    fullDescription: 'A nourishing pre-wash hair oil inspired by amla and bhringraj rituals to support stronger-looking roots and shine.',
    stock: 35,
    rating: 4.7,
    benefits: ['Supports stronger-looking roots', 'Adds natural shine', 'Pre-wash ritual friendly', 'Inspired by herbal care']
  },
  {
    name: 'GlowCare Keratin Shampoo',
    imageUrl: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 499,
    category: 'Hair Care',
    shortDescription: 'Smoothening shampoo for frizz control and shine.',
    description: 'A keratin-inspired shampoo made to gently cleanse while helping hair feel smoother, softer, and more manageable.',
    fullDescription: 'A keratin-inspired shampoo made to gently cleanse while helping hair feel smoother, softer, and more manageable.',
    stock: 40,
    rating: 4.6,
    benefits: ['Helps manage frizz', 'Smooth-feel cleansing', 'Adds shine', 'Supports softer hair']
  },
  {
    name: 'GlowCare Hair Repair Mask',
    imageUrl: 'https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=900',
    price: 599,
    category: 'Hair Care',
    shortDescription: 'Deep conditioning mask for dry and damaged hair.',
    description: 'A rich conditioning hair mask that helps dry, stressed hair feel softer, smoother, and easier to style.',
    fullDescription: 'A rich conditioning hair mask that helps dry, stressed hair feel softer, smoother, and easier to style.',
    stock: 29,
    rating: 4.8,
    benefits: ['Deep conditioning feel', 'Softens dry hair', 'Supports smoother styling', 'Weekly care ritual']
  },

  // Wellness
  {
    name: 'Herbal Immunity Booster',
    price: 799,
    category: 'wellness',
    shortDescription: 'Natural herbs for immunity support.',
    description: 'Natural herbs for immunity support. Infused with natural extracts to keep you strong and protected.',
    fullDescription: 'Natural herbs for immunity support. Infused with natural extracts to keep you strong and protected.',
    imageUrl: 'https://images.pexels.com/photos/5910933/pexels-photo-5910933.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5910933/pexels-photo-5910933.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 50,
    rating: 4.8,
    benefits: ['Boosts natural immunity', 'Rich in antioxidants', '100% organic herbs']
  },
  {
    name: 'Daily Multivitamin Capsules',
    price: 999,
    category: 'wellness',
    shortDescription: 'Essential vitamins and minerals for daily wellness.',
    description: 'Essential vitamins and minerals for daily wellness. Supports energy production and daily vitality.',
    fullDescription: 'Essential vitamins and minerals for daily wellness. Supports energy production and daily vitality.',
    imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 45,
    rating: 4.7,
    benefits: ['Full spectrum multivitamins', 'Boosts energy levels', 'Supports overall health']
  },
  {
    name: 'Detox Green Tea',
    price: 599,
    category: 'wellness',
    shortDescription: 'Helps detoxify and improve metabolism.',
    description: 'Helps detoxify and improve metabolism. A refreshing blend of green tea leaves and natural herbs.',
    fullDescription: 'Helps detoxify and improve metabolism. A refreshing blend of green tea leaves and natural herbs.',
    imageUrl: 'https://images.pexels.com/photos/10776407/pexels-photo-10776407.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/10776407/pexels-photo-10776407.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 60,
    rating: 4.6,
    benefits: ['Aids healthy digestion', 'Cleanses the system', 'Improves metabolism rate']
  },
  {
    name: 'Omega 3 Fish Oil',
    price: 1199,
    category: 'wellness',
    shortDescription: 'Supports heart and brain health.',
    description: 'Supports heart and brain health. Ultra-pure capsules loaded with healthy fatty acids.',
    fullDescription: 'Supports heart and brain health. Ultra-pure capsules loaded with healthy fatty acids.',
    imageUrl: 'https://images.pexels.com/photos/8453003/pexels-photo-8453003.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/8453003/pexels-photo-8453003.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 35,
    rating: 4.9,
    benefits: ['Promotes heart health', 'Enhances cognitive focus', 'Joint and bone support']
  },
  {
    name: 'Protein Nutrition Blend',
    price: 1499,
    category: 'wellness',
    shortDescription: 'High quality protein for fitness and recovery.',
    description: 'High quality protein for fitness and recovery. Premium vegan protein source loaded with essential amino acids.',
    fullDescription: 'High quality protein for fitness and recovery. Premium vegan protein source loaded with essential amino acids.',
    imageUrl: 'https://images.pexels.com/photos/669577/pexels-photo-669577.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/669577/pexels-photo-669577.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 30,
    rating: 4.8,
    benefits: ['25g clean protein per serving', 'Accelerates muscle recovery', 'Delicious chocolate flavor']
  },

  // Beauty
  {
    name: 'Vitamin C Face Serum',
    price: 899,
    category: 'beauty',
    shortDescription: 'Brightens skin and reduces pigmentation.',
    description: 'Brightens skin and reduces pigmentation. Enriched with hyaluronic acid for deep hydration.',
    fullDescription: 'Brightens skin and reduces pigmentation. Enriched with hyaluronic acid for deep hydration.',
    imageUrl: 'https://images.pexels.com/photos/7796511/pexels-photo-7796511.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/7796511/pexels-photo-7796511.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 40,
    rating: 4.9,
    benefits: ['Visibly brightens complexion', 'Fades dark spots', 'Boosts skin elasticity']
  },
  {
    name: 'Hydrating Face Cream',
    price: 699,
    category: 'beauty',
    shortDescription: 'Deep hydration for glowing skin.',
    description: 'Deep hydration for glowing skin. Lightweight daily moisturizer with a non-greasy formula.',
    fullDescription: 'Deep hydration for glowing skin. Lightweight daily moisturizer with a non-greasy formula.',
    imageUrl: 'https://images.pexels.com/photos/5911991/pexels-photo-5911991.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5911991/pexels-photo-5911991.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 55,
    rating: 4.7,
    benefits: ['Locks in 24-hour hydration', 'Softens skin texture', 'Creates a glowing finish']
  },
  {
    name: 'Aloe Vera Skin Gel',
    price: 499,
    category: 'beauty',
    shortDescription: 'Soothes and refreshes the skin.',
    description: 'Soothes and refreshes the skin. 100% organic gel ideal for sun-exposed or sensitive skin.',
    fullDescription: 'Soothes and refreshes the skin. 100% organic gel ideal for sun-exposed or sensitive skin.',
    imageUrl: 'https://images.pexels.com/photos/8140905/pexels-photo-8140905.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/8140905/pexels-photo-8140905.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 70,
    rating: 4.6,
    benefits: ['Calms skin irritation', 'Lightweight cooling gel', 'Multi-purpose skin hydration']
  },
  {
    name: 'Anti-Aging Night Cream',
    price: 1299,
    category: 'beauty',
    shortDescription: 'Reduces fine lines and wrinkles.',
    description: 'Reduces fine lines and wrinkles. Rich recovery night cream to replenish and nourish your skin overnight.',
    fullDescription: 'Reduces fine lines and wrinkles. Rich recovery night cream to replenish and nourish your skin overnight.',
    imageUrl: 'https://images.pexels.com/photos/5069609/pexels-photo-5069609.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5069609/pexels-photo-5069609.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 25,
    rating: 4.8,
    benefits: ['Diminishes fine lines', 'Deeply nourishes overnight', 'Firming and anti-aging care']
  },
  {
    name: 'Hair Growth Serum',
    price: 999,
    category: 'beauty',
    shortDescription: 'Strengthens roots and promotes hair growth.',
    description: 'Strengthens roots and promotes hair growth. Clinically formulated lightweight scalp serum.',
    fullDescription: 'Strengthens roots and promotes hair growth. Clinically formulated lightweight scalp serum.',
    imageUrl: 'https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 38,
    rating: 4.7,
    benefits: ['Supports root strength', 'Promotes dense hair growth', 'Lightweight non-oily serum']
  },

  // Consultation
  {
    name: 'Nutrition Consultation',
    price: 499,
    category: 'consultation',
    shortDescription: 'Personalized diet and nutrition guidance.',
    description: 'Personalized diet and nutrition guidance. Get a custom diet plan from our expert nutritionists.',
    fullDescription: 'Personalized diet and nutrition guidance. Get a custom diet plan from our expert nutritionists.',
    imageUrl: 'https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 99,
    rating: 4.9,
    benefits: ['Tailored dietary charts', 'One-on-one session', 'Ongoing dietary checkins']
  },
  {
    name: 'Weight Loss Consultation',
    price: 799,
    category: 'consultation',
    shortDescription: 'Expert advice for healthy weight management.',
    description: 'Expert advice for healthy weight management. Scientifically backed weight loss and body optimization consultations.',
    fullDescription: 'Expert advice for healthy weight management. Scientifically backed weight loss and body optimization consultations.',
    imageUrl: 'https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 99,
    rating: 4.8,
    benefits: ['Custom weight goals planning', 'Healthy fat loss advice', 'Lifestyle changes blueprint']
  },
  {
    name: 'Skin Care Consultation',
    price: 699,
    category: 'consultation',
    shortDescription: 'Professional skincare recommendations.',
    description: 'Professional skincare recommendations. Consult with certified beauty experts to design your custom routine.',
    fullDescription: 'Professional skincare recommendations. Consult with certified beauty experts to design your custom routine.',
    imageUrl: 'https://images.pexels.com/photos/3985324/pexels-photo-3985324.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/3985324/pexels-photo-3985324.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 99,
    rating: 4.7,
    benefits: ['Routine analysis session', 'Acne and aging care recommendations', 'Custom products list selection']
  },
  {
    name: 'Wellness Coaching Session',
    price: 999,
    category: 'consultation',
    shortDescription: 'Lifestyle and wellness improvement coaching.',
    description: 'Lifestyle and wellness improvement coaching. Transform your daily routine and manage stress with specialized coaching.',
    fullDescription: 'Lifestyle and wellness improvement coaching. Transform your daily routine and manage stress with specialized coaching.',
    imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 99,
    rating: 4.8,
    benefits: ['Stress management coaching', 'Mindfulness daily rituals plan', 'Better sleep hygiene habits']
  },
  {
    name: 'Fitness Consultation',
    price: 899,
    category: 'consultation',
    shortDescription: 'Customized fitness planning and guidance.',
    description: 'Customized fitness planning and guidance. Get personal training consultation and form review from top trainers.',
    fullDescription: 'Customized fitness planning and guidance. Get personal training consultation and form review from top trainers.',
    imageUrl: 'https://images.pexels.com/photos/4384679/pexels-photo-4384679.jpeg?auto=compress&cs=tinysrgb&w=900',
    image: 'https://images.pexels.com/photos/4384679/pexels-photo-4384679.jpeg?auto=compress&cs=tinysrgb&w=900',
    stock: 99,
    rating: 4.9,
    benefits: ['Workouts structure blueprint', 'Form analysis check', 'Clean strength building guide']
  }
];

const seedProducts = async () => {
  try {
    console.log('Seeding products, please wait...');
    await connectDB();
    
    // UPSERT LOGIC: Insert only missing products to avoid duplicates and deleting existing data
    let addedCount = 0;
    for (const prod of allProducts) {
      const exists = await Product.findOne({ name: prod.name });
      if (!exists) {
        await Product.create(prod);
        addedCount++;
      }
    }
    
    console.log(`Seeding complete. Added ${addedCount} new products. Total products verified.`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding products: ${error.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedProducts();
