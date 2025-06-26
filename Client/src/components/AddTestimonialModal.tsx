import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addTestimonial, updateTestimonial } from '@/redux/slices/testimonialsSlice';
import { AppDispatch } from '@/redux/store';
import { toast } from 'sonner';
import { MessageSquare, User, Building, Star, Camera, Sparkles } from 'lucide-react';
import { SERVER_BASE_URL } from '@/api';

export const AddTestimonialModal = ({ isOpen, onClose, testimonial }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setQuote(testimonial.quote);
      setCompany(testimonial.company);
      setRating(testimonial.rating || 5);
      if (testimonial.image) {
        setImagePreview(`${SERVER_BASE_URL}${testimonial.image}`);
      }
    } else {
      setName('');
      setQuote('');
      setCompany('');
      setRating(5);
      setImage(null);
      setImagePreview(null);
    }
  }, [testimonial]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quote', quote);
    formData.append('company', company);
    formData.append('rating', String(rating));
    if (image) {
      formData.append('image', image);
    }

    if (testimonial) {
      dispatch(updateTestimonial({ id: testimonial._id, testimonialData: formData }));
      toast.success('Testimonial updated successfully!');
    } else {
      dispatch(addTestimonial(formData));
      toast.success('Testimonial added successfully!');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                {testimonial ? 'Update the details of the testimonial.' : 'Add a new testimonial to your portfolio.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-500" />
                Client Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter client name..."
                required
              />
            </div>

            {/* Quote */}
            <div className="space-y-2">
              <Label htmlFor="quote" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Testimonial Quote
              </Label>
              <Textarea
                id="quote"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="min-h-[120px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter the testimonial quote..."
                required
              />
            </div>

            {/* Company and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Building className="h-4 w-4 text-purple-500" />
                  Company
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Company name..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Rating
                </Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
              <Label htmlFor="image" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Camera className="h-4 w-4 text-rose-500" />
                Client Photo
              </Label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                accept="image/*"
              />

              {imagePreview && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
