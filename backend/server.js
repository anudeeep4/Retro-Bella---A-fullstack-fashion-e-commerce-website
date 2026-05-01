require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import all models
const User = require('./models/user');
const Product = require('./models/product');
const CartItem = require('./models/cartItem');
const WishlistItem = require('./models/wishlistItem');

const app = express();

app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Fashion Store API is running...');
});

const startServer = async () => {
  try {
    // Define CORRECTED model associations with explicit foreign keys
    User.hasMany(CartItem, { foreignKey: 'userId' });
    CartItem.belongsTo(User, { foreignKey: 'userId' });
    Product.hasMany(CartItem, { foreignKey: 'productId' });
    CartItem.belongsTo(Product, { foreignKey: 'productId' });

    User.hasMany(WishlistItem, { foreignKey: 'userId' });
    WishlistItem.belongsTo(User, { foreignKey: 'userId' });
    Product.hasMany(WishlistItem, { foreignKey: 'productId' });
    WishlistItem.belongsTo(Product, { foreignKey: 'productId' });

    console.log('⏳ Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ MySQL Connection has been established successfully.');

    await sequelize.sync();
    console.log("✅ All models were synchronized successfully.");

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    // On Render, we might want to keep the process alive so we can see logs
    // even if the DB connection fails initially.
  }
};

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started on port ${PORT}`);
  startServer();
});