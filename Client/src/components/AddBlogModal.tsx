import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog, updateBlog } from '../redux/slices/blogsSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AppDispatch } from '../redux/store';

interface AddBlogModalProps {
  blog?: any;
  onClose: () => void;
}

export const AddBlogModal = ({ blog, onClose }: AddBlogModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    if (blog) {
      dispatch(updateBlog({ id: blog._id, blogData: formData }));
    } else {
      dispatch(addBlog(formData));
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{blog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <Input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          <Button type="submit">{blog ? 'Update Blog' : 'Add Blog'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
