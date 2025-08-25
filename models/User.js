import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const SALT_R = 6;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, trim: true, lowercase: true, required: true },
    password: { type: String, trim: true, minlength: 3, required: true }

},
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

export default mongoose.model('User', userSchema);
