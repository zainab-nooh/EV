import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Category from '../models/Category.js'; // Adjust path as needed
import Item from '../models/Item.js'; // Adjust path as needed

dotenv.config()
// Connect to your database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data');
    // Create Categories
    const categories = await Category.create([
      { name: 'Audio & Visual', sortOrder: 1 },
      { name: 'Lighting', sortOrder: 2 },
      { name: 'Furniture', sortOrder: 3 },
      { name: 'Catering Equipment', sortOrder: 4 },
      { name: 'Decorations', sortOrder: 5 },
      { name: 'Entertainment', sortOrder: 6 },
      { name: 'Photography', sortOrder: 7 },
      { name: 'Transportation', sortOrder: 8 }
    ]);
    console.log('Categories created:', categories.length);
    // Create Items for each category
    const audioVisualCategory = categories.find(cat => cat.name === 'Audio & Visual');
    const lightingCategory = categories.find(cat => cat.name === 'Lighting');
    const furnitureCategory = categories.find(cat => cat.name === 'Furniture');
    const cateringCategory = categories.find(cat => cat.name === 'Catering Equipment');
    const decorationsCategory = categories.find(cat => cat.name === 'Decorations');
    const entertainmentCategory = categories.find(cat => cat.name === 'Entertainment');
    const photographyCategory = categories.find(cat => cat.name === 'Photography');
    const transportationCategory = categories.find(cat => cat.name === 'Transportation');
    const items = await Item.create([
      // Audio & Visual Equipment
      {
        name: 'Professional Sound System',
        picture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        deatails: 'High-quality sound system with speakers, amplifiers, and mixing console. Perfect for events up to 500 people.',
        category: audioVisualCategory._id,
        price: 250
      },
      {
        name: 'Wireless Microphone Set',
        picture: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
        deatails: 'Set of 4 wireless microphones with charging station and receiver.',
        category: audioVisualCategory._id,
        price: 75
      },
      {
        name: 'LED Projector & Screen',
        picture: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        deatails: '4K LED projector with 120-inch portable screen for presentations and entertainment.',
        category: audioVisualCategory._id,
        price: 180
      },
      {
        name: 'DJ Booth Setup',
        picture: 'https://images.unsplash.com/photo-1571266028243-d220c6c8e4a3?w=400',
        deatails: 'Complete DJ setup with turntables, mixer, and booth table.',
        category: audioVisualCategory._id,
        price: 200
      },
      // Lighting
      {
        name: 'LED String Lights (100ft)',
        picture: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
        deatails: 'Warm white LED string lights, perfect for outdoor events and ambiance.',
        category: lightingCategory._id,
        price: 45
      },
      {
        name: 'Uplighting Package',
        picture: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=400',
        deatails: 'Set of 8 LED uplights with color changing capabilities and wireless control.',
        category: lightingCategory._id,
        price: 120
      },
      {
        name: 'Spotlight Set',
        picture: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
        deatails: 'Professional stage spotlights for highlighting performers or speakers.',
        category: lightingCategory._id,
        price: 90
      },
      {
        name: 'Disco Ball & Motor',
        picture: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        deatails: '20-inch disco ball with motor and spotlight for dance floors.',
        category: lightingCategory._id,
        price: 35
      },
      // Furniture
      {
        name: 'Round Dining Tables (8-seat)',
        picture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        deatails: 'Elegant round tables that seat 8 people comfortably. Includes white tablecloths.',
        category: furnitureCategory._id,
        price: 25
      },
      {
        name: 'Chiavari Chairs (Gold)',
        picture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        deatails: 'Elegant gold chiavari chairs with cushions. Minimum order of 10.',
        category: furnitureCategory._id,
        price: 8
      },
      {
        name: 'Cocktail Tables',
        picture: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        deatails: 'High-top cocktail tables perfect for networking events and receptions.',
        category: furnitureCategory._id,
        price: 20
      },
      {
        name: 'Lounge Furniture Set',
        picture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        deatails: 'Comfortable lounge seating including sofas, armchairs, and coffee tables.',
        category: furnitureCategory._id,
        price: 150
      },
      // Catering Equipment
      {
        name: 'Chafing Dishes (Set of 4)',
        picture: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        deatails: 'Stainless steel chafing dishes with fuel and serving utensils.',
        category: cateringCategory._id,
        price: 60
      },
      {
        name: 'Commercial Coffee Machine',
        picture: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        deatails: 'Industrial coffee machine that can serve 200+ cups per hour.',
        category: cateringCategory._id,
        price: 80
      },
      {
        name: 'Beverage Station',
        picture: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
        deatails: 'Complete beverage station with dispensers, ice buckets, and cups.',
        category: cateringCategory._id,
        price: 55
      },
      // Decorations
      {
        name: 'Balloon Arch Kit',
        picture: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        deatails: 'Complete balloon arch kit with frame, balloons, and assembly instructions.',
        category: decorationsCategory._id,
        price: 40
      },
      {
        name: 'Floral Centerpieces',
        picture: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
        deatails: 'Fresh floral centerpieces in elegant vases. Minimum order of 5.',
        category: decorationsCategory._id,
        price: 30
      },
      {
        name: 'Fabric Draping',
        picture: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
        deatails: 'Elegant fabric draping for walls, ceilings, and backdrops.',
        category: decorationsCategory._id,
        price: 65
      },
      // Entertainment
      {
        name: 'Photo Booth Props Kit',
        picture: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
        deatails: 'Fun photo booth props including signs, hats, glasses, and mustaches.',
        category: entertainmentCategory._id,
        price: 25
      },
      {
        name: 'Live Band Stage',
        picture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        deatails: 'Portable stage platform with risers, perfect for live performances.',
        category: entertainmentCategory._id,
        price: 200
      },
      {
        name: 'Casino Table Games',
        picture: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?w=400',
        deatails: 'Professional casino tables including blackjack, poker, and roulette.',
        category: entertainmentCategory._id,
        price: 180
      },
      // Photography
      {
        name: 'Professional Photo Backdrop',
        picture: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400',
        deatails: 'Adjustable backdrop stand with various backdrop options.',
        category: photographyCategory._id,
        price: 50
      },
      {
        name: 'Studio Lighting Kit',
        picture: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
        deatails: 'Professional photography lighting kit with softboxes and stands.',
        category: photographyCategory._id,
        price: 120
      },
      // Transportation
      {
        name: 'Luxury Event Bus',
        picture: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        deatails: 'Luxury bus for guest transportation, seats up to 40 passengers.',
        category: transportationCategory._id,
        price: 400
      },
      {
        name: 'Valet Parking Service',
        picture: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
        deatails: 'Professional valet parking service for 4 hours.',
        category: transportationCategory._id,
        price: 300
      }
    ]);
    console.log('Items created:', items.length);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};
// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder()
export default seedData;