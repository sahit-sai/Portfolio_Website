import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  status: "idle",
  error: null,
};

interface TestimonialData {
  name: string;
  quote: string;
  company: string;
  image: string;
  rating: number;
}

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/testimonials");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (testimonialData: FormData, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.post(
        "/testimonials",
        testimonialData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async (
    { id, testimonialData }: { id: string; testimonialData: FormData },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.put(
        `/testimonials/${id}`,
        testimonialData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      await apiClient.delete(`/testimonials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default testimonialsSlice.reducer;
