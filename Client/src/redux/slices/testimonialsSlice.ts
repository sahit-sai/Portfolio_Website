import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:3001"
}/api/testimonials`;

interface TestimonialData {
  name: string;
  quote: string;
  company: string;
}

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (testimonialData: TestimonialData, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await axios.post(API_URL, testimonialData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async (
    { id, testimonialData }: { id: string; testimonialData: TestimonialData },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${id}`, testimonialData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (t: any) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (t: any) => t._id !== action.payload
        );
      });
  },
});

export default testimonialsSlice.reducer;
