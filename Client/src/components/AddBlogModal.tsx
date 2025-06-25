import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog, updateBlog } from '../redux/slices/blogsSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AppDispatch } from '../redux/store';

interface AddBlogModalProps {
  isOpen: boolean;
  blog?: any;
  onClose: () => void;
}

export const AddBlogModal = ({ isOpen, blog, onClose }: AddBlogModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setImage(blog.image);
    } else {
      setTitle('');
      setContent('');
      setImage('');
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = { title, content, image };

    if (blog) {
      dispatch(updateBlog({ id: blog._id, blogData }));
    } else {
      dispatch(addBlog(blogData));
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{blog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
          <Button type="submit">{blog ? 'Update Blog' : 'Add Blog'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
