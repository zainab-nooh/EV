import './Category.js';
const Schema = (await import('mongoose')).Schema;

const item = new Schema({
  name: { type: String, required: true },
  picture: String,
  deatails: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

export default item;