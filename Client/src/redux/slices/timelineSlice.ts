import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api`;

export interface TimelineItem {
  _id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  type: 'work' | 'education';
  achievements: string[];
}

interface TimelineState {
  items: TimelineItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TimelineState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTimeline = createAsyncThunk('timeline/fetchTimeline', async () => {
  const response = await axios.get(`${API_URL}/timeline`);
  return response.data;
});

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeline.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTimeline.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch timeline';
      });
  },
});

export default timelineSlice.reducer;
