import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  quote: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, required: true, default: 5 },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
