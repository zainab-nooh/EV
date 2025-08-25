import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  picture: String,
  details: String,  // Fixed typo from 'deatails'
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);