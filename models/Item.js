import './Category.js';
import { model, Schema} from 'mongoose'

const itemSchema = new Schema({
  name: { type: String, required: true },
  picture: String,
  details: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

export default model('Item', itemSchema)