import { useState, useEffect } from 'react';
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
import { addProject, updateProject } from '@/redux/slices/projectsSlice';
import { AppDispatch } from '@/redux/store/store';
import { toast } from 'sonner';

export const AddProjectModal = ({ isOpen, onClose, project }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [liveUrl, setLiveUrl] = useState(''); const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description); setCategory(project.category);
      setLiveUrl(project.liveUrl);
      setGithubUrl(project.githubUrl);
      setTechnologies(project.tags ? project.tags.join(', ') : '');
    } else {
      setTitle('');
      setDescription('');
      setCategory(''); setLiveUrl('');
      setGithubUrl('');
      setTechnologies('');
      setImage(null);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description); formData.append('category', category);
    formData.append('liveUrl', liveUrl);
    formData.append('githubUrl', githubUrl);
    formData.append('technologies', technologies);
    if (image) {
      formData.append('image', image);
    }

    if (project) {
      dispatch(updateProject({ id: project._id, projectData: formData }));
      toast.success('Project updated successfully!');
    } else {
      dispatch(addProject(formData));
      toast.success('Project added successfully!');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogDescription>
            {project ? 'Update the details of your project.' : 'Add a new project to your portfolio.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="col-span-3 border rounded px-2 py-2"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX">UI/UX</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liveUrl" className="text-right">
                Live URL
              </Label>
              <Input id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="col-span-3" />
            </div>            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="githubUrl" className="text-right">
                GitHub URL
              </Label>
              <Input id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technologies" className="text-right">
                Technologies
              </Label>
              <Input
                id="technologies"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="col-span-3"
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                className="col-span-3"
              />
            </div>
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
