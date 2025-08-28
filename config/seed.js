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
      { name: 'Venue', sortOrder: 1, image:'/venue/heaven.png'},
      { name: 'Stage & Decorations', sortOrder: 2, image:'/decoration/Stage & Decorations.png'},
      { name: 'Cake', sortOrder: 3, image:'/Cakes/cake.png' },
      { name: 'Flower & Gifts', sortOrder: 4, image:'/flower/flower-3.jpg' },
      { name: 'Catering', sortOrder: 5, image:'/Catering/Beyond-catering-TradBreakfast.jpg'},
      { name: 'Photography', sortOrder: 6, image:'/Photography/photo2.jpeg' },
      { name: 'Staffing Services', sortOrder: 7, image:'/service/super.jpg' },
      { name: 'Game & Activities', sortOrder: 8,image:'/games/PrizeWheel.jpg' }
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
        name: 'FourSeason Ballroom',
        picture: '/venue/4season.jpg',
        details: 'Illuminated by natural light, with the Bay and the Manama skyline offering a dramatic backdrop, our Al Bahrain Ballroom is an elegant setting for unforgettable events. Fully flexible, the room can be configured into three smaller sections and connects to an outdoor terrace and a lush lawn.',
        category: venueCategory._id,
        price: 250
      },
      {
        name: 'BIBF AUDITORIUM',
        picture: '/venue/bibf.jpg',
        details: ' The Auditorium is a state-of-the-art space located on the ground and first floor of the BIBF’s building. Many events and masterclasses have been held in The Auditorium, with a capacity of more than 284 seats, a digital podium, and impeccable acoustics, the Auditorium provides a sanctuary of modern architectural space, perfectly designed to accommodate modern needs',
        category: venueCategory._id,
        price: 75
      },
      {
        name: 'The Heaven',
        picture: '/venue/heaven.png',
        details: 'Haremlik Hall, Wonderful empire party, grand reception in the ballroom - whatever the wedding, we\'ve got the perfect photo setting right here at The Heaven Palace.',
        category: venueCategory._id,
        price: 180
      },
      {
        name: 'Johrara Balroom',
        picture: '/venue/joharah-balroom-wedding_Jumeirah.png',
        details: 'Tastefully appointed with classic Arabian decor, this charming ballroom enjoys an adjacent pre-function area and is ideal for intimate gatherings and training seminars',
        category: venueCategory._id,
        price: 200
      },
      {
        name: 'Majlis Al Salam',
        picture: '/venue/majlis_alsalam_Jumeirah.png',
        details: 'This elegant ballroom is decorated in an arabesque style and perfect for large groups. Adjoining pre-function areas and an outdoor terrace allow for genuinely dynamic events.',
        category: venueCategory._id,
        price: 200
      },
      {
        name: 'Sofitel Bahrain Ballroom',
        picture: '/venue/sofitel.jpg',
        details: 'The Sofitel Bahrain is a luxurious venue that combines French elegance with Arabian hospitality. Featuring high ceilings, stunning chandeliers, and state-of-the-art audio-visual facilities, it can accommodate both intimate gatherings and large-scale events. Ideal for weddings, corporate functions, galas, and special celebrations, the ballroom offers flexible seating arrangements, elegant décor, and professional event support to ensure a seamless and memorable experience.',
        category: venueCategory._id,
        price: 200
      },


      // Stage and Decorations
      {
        name: 'Baloon Theme',
        picture: '/decoration/ballooned.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 45
      },
      {
        name: 'Boho Theme',
        picture: '/decoration/boho.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 120
      },
      {
        name: 'Classic Theme',
        picture: '/decoration/classic.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 90
      },
      {
        name: 'Fabric',
        picture: '/decoration/fabric.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 35
      },
      {
        name: 'Flowered',
        picture: '/decoration/flowered.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 35
      },
      {
        name: 'Nature-inspired Theme',
        picture: '/decoration/nature-inspired.jpg',
        details: '',
        category: decorationsCategory._id,
        price: 35
      },
      {
        name: 'Traditional Theme',
        picture: '/decoration/traditional.jpg',
        details: '',
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
        name: 'Pure White Serenity Flowers Vase',
        picture: '/flower/flower-1.jpg',
        details: 'Bring timeless elegance to any space with a serene arrangement of White Gerbera, White Limonium, White Delphinium, and Light Blue Delphinium, beautifully displayed in a sleek cylinder glass vase.',
        category: flowerCategory._id,
        price: 20
      },
      {
        name: 'Boho Flowers Bouquet',
        picture: '/flower/flower-2.jpg',
        details: 'Honor the spirit of spirit of celebration with a bouquet that captures serenity and celebration in every bloom. This elegant arrangement features pristine white roses paired with ethereal purple delphinium stems and soft light blue delphiniums, evoking a calming, graceful presence.',
        category: flowerCategory._id,
        price: 23
      },
      {
        name: 'Cake Boutique 21 Happy Birthday |  The Happiness Roses Bouquet',
        picture: '/flower/flower-3.jpg',
        details: 'Love takes shape in the sweetest way with this enchanting duo.',
        category: flowerCategory._id,
        price: 21
      },
      {
        name: 'AH by Azhar Hubail Glam Touch Set',
        picture: '/flower/flower-4.jpg',
        details: 'Celebrate beauty and elegance with the Azhar Hubail Glam Set for Women, featuring the captivating Lavish Perfume 100 ml (Unisex) and the luxurious Mat Lip Lacquer.',
        category: flowerCategory._id,
        price: 55
      },
      {
        name: 'Fragrance of The Day Flowers Vase',
        picture: '/flower/flower-5.jpg',
        details: 'A vibrant harmony of color and calm, this floral arrangement brings sunshine indoors with poise. Bright yellow sunflowers stand tall with energy, while yellow roses soften the scene with a golden warmth. ',
        category: flowerCategory._id,
        price: 100
      },
      {
        name: 'Apple iPhone 16 Plus 128 GB Pink | Red Roses Bouquet',
        picture: '/flower/flower-6.jpg',
        details: 'Surprise someone special with the Apple iPhone 16 Plus 128 GB in Pink paired with a Red Roses Bouquet—the best gift for your special and loved people. This luxury gift expresses appreciation and love, combining cutting-edge technology with timeless floral elegance. ',
        category: flowerCategory._id,
        price: 505
      },
      {
        name: 'Red Love You Roses Box',
        picture: '/flower/flower-7.jpg',
        details: 'Speak the language of love with a romantic floral gesture that captures the heart. This elegant cylindrical cream box is filled with rich red roses, each bloom whispering affection and devotion. At the top, two graceful white orchids are artistically arranged in the shape of a ribbon, symbolizing connection and lasting love.',
        category: flowerCategory._id,
        price: 28
      },
      {
        name: 'Zia Emerald Pendant Necklace | Birthday Flowers',
        picture: '/flower/flower-8.jpg',
        details: 'Celebrate her special day with this elegant necklace from Zia, crafted from rhodium plated sterling silver and featuring a stunning rectangular emerald green cubic zirconia stone pendant. This luxurious necklace is the perfect gift for an elegant lady, combining sophistication and charm.',
        category: flowerCategory._id,
        price: 35
      },
      {
        name: 'Magical Flowers Bouquet',
        picture: '/flower/flower-9.jpg',
        details: 'Celebrate with a bouquet that radiates joy and festivity. This stunning arrangement blends the cheerful charm of pink gerbera, the soft elegance of purple and orange roses, and the vibrant pop of fuchsia baby roses. Accented with delicate white gypsophila and soothing green eucalyptus, each bloom is carefully arranged to create a sense of heartfelt celebration.',
        category: flowerCategory._id,
        price: 22
      },
      // Catering
      {
        name: 'Classic Buffet',
        picture: '/Catering/Beyond-catering-Classic-Buffet.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 7.8
      },
      {
        name: 'Standard Buffet',
        picture: '/Catering/Beyond-catering-Standard.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 10.5
      },
      {
        name: 'Traditional BreakFast',
        picture: '/Catering/Beyond-catering-TradBreakfast.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 6.6
      },
      {
        name: 'VIP Package',
        picture: '/Catering/Beyond-catering-VIP.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 6.6
      },
      {
        name: 'Bolognese Musaka',
        picture: '/Catering/Bolognese Musaka.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4
      },
      {
        name: 'Brioche Slice Sandwich',
        picture: '/Catering/Brioche Slice Sandwich.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 5
      },
      {
        name: 'Chia & Mango Dessert',
        picture: '/Catering/Chia & Mango Dessert.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 7.4
      },
      {
        name: 'Chicken Biryani',
        picture: '/Catering/Chicken Biryani.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.3
      },
      {
        name: 'Chocolate Pudding',
        picture: '/Catering/Chocolate Pudding.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 8.5
      },
      {
        name: 'Danish & Croissant',
        picture: '/Catering/Danish & Croissant.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },
      {
        name: 'Halloumi & Date Salad',
        picture: '/Catering/Halloumi & Date Salad.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },
      {
        name: 'Khash Khash Dessert',
        picture: '/Catering/Khash Khash Dessert.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },
      {
        name: 'Layali Box',
        picture: '/Catering/Layali Box.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },
      {
        name: 'Mango Salad',
        picture: '/Catering/Mango Salad.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4
      },
      {
        name: 'Mango Trifle',
        picture: '/Catering/Mango Trifle.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.8
      },
      {
        name: 'Mini Brioche',
        picture: '/Catering/Mini Brioche.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 6.6
      },
      {
        name: 'Mini Croissant',
        picture: '/Catering/Mini Croissant.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.8
      },
      {
        name: 'Parisian Salad',
        picture: '/Catering/Parisian Salad.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4
      },
      {
        name: 'Pasta Bechamel with Meat',
        picture: '/Catering/Pasta Bechamel with Meat.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4.4
      },
      {
        name: 'Pasta Chicken & Spinach',
        picture: '/Catering/Pasta Chicken & Spinach.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4.2
      },
      {
        name: 'Rice Mdalal',
        picture: '/Catering/Rice Mdalal.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4.2
      },
      {
        name: 'Saffron Milk Cake',
        picture: '/Catering/Saffron Milk Cake.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 4.2
      },
      {
        name: 'Sandwiches Box',
        picture: '/Catering/Sandwiches Box.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 5
      },
      {
        name: 'Strawberry Salad',
        picture: '/Catering/Strawberry Salad.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },
      {
        name: 'Um Ali',
        picture: '/Catering/Um Ali.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 2.8
      },
      {
        name: 'VillaMam Catering',
        picture: '/Catering/VillaMama.jpg',
        details: 'By Beyond Catering Boutique',
        category: cateringCategory._id,
        price: 3.5
      },

      // Photography
      {
        name: 'Birthday Package 1',
        picture: '/Photography/photo1.jpeg',
        details: 'By Exposure Studio - Package details - 55 BHD 	20 printed pictures (5 x 7) inch. All Birthday pictures will be given to the client to chose  the preferred pictures (on USB-low resolution). Chosen pictures will be professionally edited and save on USB. Studio Lighting set up. One Photographer. One Hour',
        category: photographyCategory._id,
        price: 55
      },
      {
        name: 'Birthday Package 2',
        picture: '/Photography/photo2.jpeg',
        details: 'By Exposure Studio - Package details - 55 BHD 	25 printed pictures (5 x 7) inch. All Birthday pictures will be given to the client to chose  the preferred pictures (on USB-low resolution). Chosen pictures will be professionally edited and save on USB. Studio Lighting set up. One Photographer. One Hour',
        category: photographyCategory._id,
        price: 200
      },
      {
        name: 'Birthday Package 3',
        picture: '/Photography/photo3.jpeg',
        details: 'By Exposure Studio - Birthday Album (10×10) inch (25×25)cm. 40 to 45 pictures. All Birthday pictures will be given to the client to chose  the preferred pictures (on USB-low resolution). Chosen pictures will be professionally edited and save on USB. Studio Lighting set up. One Photographer. Two Hour',
        category: photographyCategory._id,
        price: 180
      },
      {
        name: 'Outdoor Coverage',
        picture: '/Photography/outdoor-coverage.jpeg',
        details: 'By Amani Studio - Birthday parties, family gatherings, reception, bridal shower, baby shower , Events & any ceremony',
        category: photographyCategory._id,
        price: 66
      },
      // Staffing Services
      {
        name: 'Anwar Albaharin Services',
        picture: '/service/Anwar-bahrain.jpg',
        details: 'Trusted staffing solutions providing skilled professionals for events, hospitality, and corporate needs.',
        category: staffingCategory._id,
        price: 20
      },
      {
        name: 'Arabian Services',
        picture: '/service/arabian-service.jpg',
        details: 'Comprehensive manpower and event support services with a focus on quality and reliability.',
        category: staffingCategory._id,
        price: 17
      },
      {
        name: 'Fraser Services',
        picture: '/service/fraser-Hospitality.jpeg',
        details: 'Specialized in hospitality staffing, offering trained personnel for hotels, banquets, and large-scale functions.',
        category: staffingCategory._id,
        price: 30
      },
      {
        name: 'Qnad',
        picture: '/service/Qnad.jpg',
        details: 'Flexible staffing service designed to meet both short-term and long-term workforce requirements.',
        category: staffingCategory._id,
        price: 16
      },
      {
        name: 'Siqrat Cleaning Services',
        picture: '/service/siqrat.png',
        details: 'Professional cleaning teams providing reliable and detail-oriented services for events and venues.',
        category: staffingCategory._id,
        price: 22
      },
      {
        name: 'Super Catering Services',
        picture: '/service/super.jpg',
        details: 'Full-service catering staff delivering exceptional food service and hospitality for every occasion.',
        category: staffingCategory._id,
        price: 30
      },

      // Game & Activities
      {
        name: '360 Booth',
        picture: '/games/360Booth.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 20
      },
      {
        name: 'Audio Guest Book',
        picture: '/games/AudioGuestBook.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 45
      },
      {
        name: 'Karaoke Corner',
        picture: '/games/KaraokeCorner.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 60
      },
      {
        name: 'Photo Booth',
        picture: '/games/PhotoBooth.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 45
      },
      {
        name: 'Polaroid Wall',
        picture: '/games/PolaroidWall.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 30
      },
      {
        name: 'Prize Wheel',
        picture: '/games/PrizeWheel.jpg',
        details: '',
        category: activtiesCategory._id,
        price: 20
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