require('dotenv').config();
const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  process.exit(0);
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}); 