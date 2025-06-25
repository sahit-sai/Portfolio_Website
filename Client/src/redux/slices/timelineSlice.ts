import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api';

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

export const fetchTimeline = createAsyncThunk('timeline/fetchTimeline', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/timeline');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch timeline');
  }
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
        state.error = action.payload as string;
      });
  },
});

export default timelineSlice.reducer;
