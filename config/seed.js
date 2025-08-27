import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Category from '../models/Category.js'; // Adjust path as needed
import Item from '../models/Item.js'; // Adjust path as needed
// import cake1 from '.cake1.png'

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
      { name: 'Venue', sortOrder: 1 },
      { name: 'Stage & Decorations', sortOrder: 2 },
      { name: 'Cake', sortOrder: 3 },
      { name: 'Flower & Gifts', sortOrder: 4 },
      { name: 'Catering', sortOrder: 5 },
      { name: 'Photography', sortOrder: 6 },
      { name: 'Staffing Services', sortOrder: 7 },
      { name: 'Game & Activities', sortOrder: 8 }
    ]);
    console.log('Categories created:', categories.length);
    // Create Items for each category
    const venueCategory = categories.find(cat => cat.name === 'Venue');
    const decorationsCategory = categories.find(cat => cat.name === 'Stage & Decorations');
    const cakeCategory = categories.find(cat => cat.name === 'Cake');
    const flowerCategory = categories.find(cat => cat.name === 'Flower & Gifts');
    const cateringCategory = categories.find(cat => cat.name === 'Catering');
    const photographyCategory = categories.find(cat => cat.name === 'Photography');
    const staffingCategory = categories.find(cat => cat.name === 'Staffing Services');
    const activtiesCategory = categories.find(cat => cat.name === 'Game & Activities');
    const items = await Item.create([
      // Venue
      {
        name: 'Professional Sound System',
        picture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        details: 'High-quality sound system with speakers, amplifiers, and mixing console. Perfect for events up to 500 people.',
        category: venueCategory._id,
        price: 250
      },
      {
        name: 'Wireless Microphone Set',
        picture: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
        details: 'Set of 4 wireless microphones with charging station and receiver.',
        category: venueCategory._id,
        price: 75
      },
      {
        name: 'LED Projector & Screen',
        picture: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        details: '4K LED projector with 120-inch portable screen for presentations and entertainment.',
        category: venueCategory._id,
        price: 180
      },
      {
        name: 'DJ Booth Setup',
        picture: 'https://images.unsplash.com/photo-1571266028243-d220c6c8e4a3?w=400',
        details: 'Complete DJ setup with turntables, mixer, and booth table.',
        category: venueCategory._id,
        price: 200
      },
      // Stage and Decorations
      {
        name: 'LED String Lights (100ft)',
        picture: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
        details: 'Warm white LED string lights, perfect for outdoor events and ambiance.',
        category: decorationsCategory._id,
        price: 45
      },
      {
        name: 'Uplighting Package',
        picture: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=400',
        details: 'Set of 8 LED uplights with color changing capabilities and wireless control.',
        category: decorationsCategory._id,
        price: 120
      },
      {
        name: 'Spotlight Set',
        picture: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
        details: 'Professional stage spotlights for highlighting performers or speakers.',
        category: decorationsCategory._id,
        price: 90
      },
      {
        name: 'Disco Ball & Motor',
        picture: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        details: '20-inch disco ball with motor and spotlight for dance floors.',
        category: decorationsCategory._id,
        price: 35
      },
      // Cake
      {
        name: '20 Retro',
        picture: '/cake/20retro.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 20
      },
      {
        name: 'Bahrain Defence Force',
        picture: '/cake/bahrain_defence_force.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 20
      },
      {
        name: 'Bahrain Ministry Of Interior',
        picture: '/cake/bahrain_ministry_of_interior.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 20
      },
      {
        name: 'Birthday',
        picture: '/cake/birthday_balloo.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 20
      },
      {
        name: 'Classic White Piping',
        picture: '/cake/classic_white_piping.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 20
      },
      {
        name: 'No More Chemo Pink',
        picture: '/cake/no_more_chemo_pink.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 8
      },
      {
        name: 'Pinkberry Piping',
        picture: '/cake/pinkberry_piping.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 8
      },
      {
        name: 'Queen Hearts',
        picture: '/cake/queen_hearts.png',
        details: 'By Lola Cake',
        category: cakeCategory._id,
        price: 8
      },
  
      // Flower & Gifts
      {
        name: 'Chafing Dishes (Set of 4)',
        picture: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        details: 'Stainless steel chafing dishes with fuel and serving utensils.',
        category: flowerCategory._id,
        price: 60
      },
      {
        name: 'Commercial Coffee Machine',
        picture: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
        details: 'Industrial coffee machine that can serve 200+ cups per hour.',
        category: flowerCategory._id,
        price: 80
      },
      {
        name: 'Beverage Station',
        picture: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
        details: 'Complete beverage station with dispensers, ice buckets, and cups.',
        category: flowerCategory._id,
        price: 55
      },
      // Catering
      {
        name: 'Balloon Arch Kit',
        picture: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        details: 'Complete balloon arch kit with frame, balloons, and assembly instructions.',
        category: cateringCategory._id,
        price: 40
      },
      {
        name: 'Floral Centerpieces',
        picture: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
        details: 'Fresh floral centerpieces in elegant vases. Minimum order of 5.',
        category: cateringCategory._id,
        price: 30
      },
      {
        name: 'Fabric Draping',
        picture: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
        details: 'Elegant fabric draping for walls, ceilings, and backdrops.',
        category: cateringCategory._id,
        price: 65
      },
      // Photography
      {
        name: 'Photo Booth Props Kit',
        picture: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
        details: 'Fun photo booth props including signs, hats, glasses, and mustaches.',
        category: photographyCategory._id,
        price: 25
      },
      {
        name: 'Live Band Stage',
        picture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        details: 'Portable stage platform with risers, perfect for live performances.',
        category: photographyCategory._id,
        price: 200
      },
      {
        name: 'Casino Table Games',
        picture: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?w=400',
        details: 'Professional casino tables including blackjack, poker, and roulette.',
        category: photographyCategory._id,
        price: 180
      },
      // Staffing Services
      {
        name: 'Professional Photo Backdrop',
        picture: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400',
        details: 'Adjustable backdrop stand with various backdrop options.',
        category: staffingCategory._id,
        price: 50
      },
      {
        name: 'Studio Lighting Kit',
        picture: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
        details: 'Professional photography lighting kit with softboxes and stands.',
        category: staffingCategory._id,
        price: 120
      },
      // Game & Activities
      {
        name: 'Luxury Event Bus',
        picture: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        details: 'Luxury bus for guest transportation, seats up to 40 passengers.',
        category: activtiesCategory._id,
        price: 400
      },
      {
        name: 'Valet Parking Service',
        picture: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
        details: 'Professional valet parking service for 4 hours.',
        category: activtiesCategory._id,
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