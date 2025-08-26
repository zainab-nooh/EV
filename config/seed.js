import dotenv from 'dotenv';
import './database.js';
import Category from '../models/Category.js';
import Item from '../models/Item.js';

dotenv.config();

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Venues', sortOrder: 10},
    {name: 'Stages & Decorations', sortOrder: 20},
    {name: 'Games & activities', sortOrder: 30},
    {name: 'Speakers', sortOrder: 40},
    {name: 'Foods', sortOrder: 50},
    {name: 'Drinks', sortOrder: 60},
    {name: 'Service & Support', sortOrder: 70},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Conference Hall', picture: '🏢',deatails:'details' ,category: categories[0], price: 300},
    {name: '🏨 Hotel Ballroom', picture: '🏨',deatails:'details' , category: categories[0], price: 299},
    {name: 'Private Villa', picture: '🏠',deatails:'details', category: categories[0], price: 250},
    {name: 'Stage Platform', picture: '🎤',deatails:'details', category: categories[1], price: 100},
    {name: 'Special Effects', picture: '🎇',deatails:'details', category: categories[1], price: 60},
    {name: 'Darts', picture: '🎯',deatails:'details', category: categories[2], price: 10},
    {name: 'Video Games', picture: '🕹️',deatails:'details', category: categories[2], price: 50},
    {name: 'Panel Moderator', picture: '🎙️',deatails:'details', category: categories[3], price: 30},
    {name: 'Pizza', picture: '🍕',deatails:'details', category: categories[4], price: 18},
    {name: 'Burger', picture: '🍔',deatails:'details', category: categories[4], price: 5},
    {name: 'Ice Cream', picture: '🍦',deatails:'details', category: categories[4], price: 3},
    {name: 'Cola', picture: '🥤',deatails:'details', category: categories[5], price: 1.5},
    {name: 'Tea', picture: '🍵',deatails:'details', category: categories[5], price: 2.5},
    {name: 'Event Staff', picture: '👥',deatails:'price: hour per person', category: categories[6], price: 15},
    {name: 'Cleaning Services', picture: '🧹',deatails:'price: per person', category: categories[6], price: 25},
  ]);

  console.log(items)

  process.exit();

})();