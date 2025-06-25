import Timeline from './timeline.model.js';

// Get all timeline items
export const getTimelineItems = async (req, res) => {
  try {
    const timelineItems = await Timeline.find();
    res.json(timelineItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a timeline item
export const createTimelineItem = async (req, res) => {
  const { title, company, year, description, type, achievements } = req.body;
  const newTimelineItem = new Timeline({
    title,
    company,
    year,
    description,
    type,
    achievements,
  });

  try {
    const savedTimelineItem = await newTimelineItem.save();
    res.status(201).json(savedTimelineItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a timeline item
export const updateTimelineItem = async (req, res) => {
  try {
    const updatedTimelineItem = await Timeline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTimelineItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a timeline item
export const deleteTimelineItem = async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timeline item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
