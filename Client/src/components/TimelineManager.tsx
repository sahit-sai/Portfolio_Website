import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTimeline } from '@/redux/slices/timelineSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const TimelineManager = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: timeline, status } = useSelector((state: RootState) => state.timeline);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    dispatch(fetchTimeline());
  }, [dispatch]);

  const handleAddNew = () => {
    setCurrentItem({
      _id: null,
      title: '',
      company: '',
      year: '',
      description: '',
      type: 'education',
      achievements: [],
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_URL}/timeline/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(fetchTimeline());
      } catch (error) {
        console.error('Failed to delete timeline item', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Timeline</h2>
        <Button onClick={handleAddNew}>Add New Item</Button>
      </div>
      <div className="grid gap-4">
        {timeline.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.company} ({item.year})</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Company:</strong> {item.company}</p>
              <p><strong>Year:</strong> {item.year}</p>
              <p><strong>Description:</strong> {item.description}</p>
              {item.achievements && item.achievements.length > 0 && (
                <div>
                  <strong>Achievements:</strong>
                  <ul className="list-disc list-inside">
                    {item.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isModalOpen && currentItem && (
        <TimelineFormModal
          item={currentItem}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentItem(null);
          }}
          onSave={() => {
            setIsModalOpen(false);
            setCurrentItem(null);
            dispatch(fetchTimeline());
          }}
        />
      )}
    </div>
  );
};

const TimelineFormModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    company: item?.company || '',
    year: item?.year || '',
    description: item?.description || '',
    type: item?.type || 'education',
    achievements: Array.isArray(item?.achievements) ? item.achievements.join('\n') : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dataToSubmit = {
      ...formData,
      achievements: formData.achievements.split('\n').filter(Boolean),
    };

    try {
      if (item._id) {
        await axios.put(`${API_URL}/timeline/${item._id}`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/timeline`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save timeline item', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{item._id ? 'Edit' : 'Add'} Timeline Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company/Institution" required />
          <Input name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
          <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <Select onValueChange={handleSelectChange} defaultValue={formData.type}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Textarea name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Achievements (one per line)" />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelineManager;
