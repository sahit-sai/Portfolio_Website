import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/contact';

export const sendContactMessage = createAsyncThunk('contact/sendMessage', async (messageData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    sending: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.sending = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
