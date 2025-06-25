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
import { AppDispatch } from '@/redux/store'; // Corrected import path
import { toast } from 'sonner';

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
        setImagePreview(`http://localhost:3001${testimonial.image}`);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          <DialogDescription>
            {testimonial ? 'Update the details of the testimonial.' : 'Add a new testimonial to your portfolio.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quote" className="text-right">
                Quote
              </Label>
              <Textarea id="quote" value={quote} onChange={(e) => setQuote(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input id="rating" type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Photo
              </Label>
              <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" />
            </div>
            {imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div />
                <div className="col-span-3">
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
