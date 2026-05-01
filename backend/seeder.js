require('dotenv').config();
const sequelize = require('./config/database');
const Product = require('./models/product');

const products = [
  // Mens Fashion
  { name: 'Classic Blue Jeans', description: 'Comfortable and stylish regular-fit jeans.', imageURL: 'pics/blue-jeans.jpg', price: 2499, category: 'mens-fashion' },
  { name: 'White Linen Shirt', description: 'A breathable shirt perfect for summer.', imageURL: 'pics/white-shirt.jpg', price: 1799, category: 'mens-fashion' },
  { name: 'Leather Biker Jacket', description: 'A timeless and rugged biker jacket.', imageURL: 'pics/leather-jacket.jpg', price: 7999, category: 'mens-fashion' },

  // Womens Fashion
  { name: 'Floral Sundress', description: 'A light and airy dress for sunny days.', imageURL: 'pics/floral-sundress.jpeg', price: 2999, category: 'womens-fashion' },
  { name: 'High-Waisted Trousers', description: 'Elegant and professional high-waisted trousers.', imageURL: 'pics/high-waisted.jpg', price: 2299, category: 'womens-fashion' },
  { name: 'Silk Blouse', description: 'A luxurious silk blouse for any occasion.', imageURL: 'pics/silk-blouse.webp', price: 3499, category: 'womens-fashion' },
  
  // Kids wear
  { name: 'Dinosaur Graphic T-shirt', description: 'Fun and comfy cotton t-shirt for kids.', imageURL: 'pics/dino-tshirt.webp', price: 899, category: 'kids-wear' },
  { name: 'Blue Denim Shorts', description: 'Durable and playful shorts for everyday wear.', imageURL: 'pics/blue-denim-shorts.jpg', price: 1199, category: 'kids-wear' },

  { name: 'Red Velvet Lipstick', description: 'A bold, long-lasting matte lipstick.', imageURL: 'pics/ref-velvet-lipstick.png', price: 1299, category: 'cosmetics' },
  { name: 'Flawless Finish Foundation', description: 'A lightweight foundation for a natural, everyday look.', imageURL: 'pics/flawless-finish.webp', price: 2199, category: 'cosmetics' },
  { name: 'Sunset Glow Eyeshadow Palette', description: 'A palette of 6 warm, pigmented shades.', imageURL: 'pics/sunset-glow.webp', price: 2999, category: 'cosmetics' },

  // Accessories
  { name: 'Classic Aviator Sunglasses', description: 'Protect your eyes with these timeless aviator sunglasses.', imageURL: 'pics/classic-avi-sunglass.webp', price: 1599, category: 'accessories' },
  { name: 'Tan Leather Tote Bag', description: 'A stylish and spacious bag perfect for any occasion.', imageURL: 'pics/tan-leather-bag.jpg', price: 3999, category: 'accessories' },
  { name: 'Omega Watch', description: 'An elegant and simple watch with a silver mesh strap.', imageURL: 'pics/silver-watch.webp', price: 40599, category: 'accessories' },

  // Footwear

{ name: 'Classic Leather Loafers', description: 'Elegant and versatile loafers for any formal occasion.', imageURL: 'pics/leather-loafer.webp', price: 3499, category: 'footwear' },
{ name: 'Minimalist White Sneakers', description: 'A must-have staple for your casual wardrobe.', imageURL: 'pics/white-sneakers.jpg', price: 2899, category: 'footwear' },
{ name: 'Suede Chelsea Boots', description: 'Stylish and comfortable suede boots for a sharp look.', imageURL: 'pics/chelsea-boots.webp', price: 4999, category: 'footwear' }
];

const importData = async () => {
  try {
    // Disable foreign key checks to allow dropping tables with dependencies
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    await sequelize.sync({ force: true });
    console.log('Table synchronized!');

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Product.bulkCreate(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    // Ensure checks are re-enabled even if it fails
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();