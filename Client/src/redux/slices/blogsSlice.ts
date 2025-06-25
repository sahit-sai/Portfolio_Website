import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Blog } from "../../types"; // Assuming you have a types file

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:3001"
}/api/blogs`;

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author?: string;
  createdAt: string;
  tags?: string[];
  readTime?: number;
  views?: number;
  category?: string;
  featured?: boolean;
  likes?: number;
  trending?: boolean;
}

interface BlogsState {
  blogs: Blog[];
  currentBlog: Blog | null;
  relatedBlogs: Blog[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

// Async thunk for fetching blogs
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single blog
export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a blog
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData: FormData, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await axios.post(API_URL, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (
    { id, blogData }: { id: string; blogData: FormData },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${id}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
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

// Async thunk for liking a blog
export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/like`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a comment
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async (
    {
      blogId,
      author,
      content,
    }: { blogId: string; author: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/${blogId}/comments`, {
        author,
        content,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: BlogsState = {
  blogs: [],
  currentBlog: null,
  relatedBlogs: [],
  isLoading: false,
  isError: false,
  message: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const blogsData = action.payload.blogs || action.payload;
        state.blogs = Array.isArray(blogsData) ? blogsData : [];
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.currentBlog = action.payload.blog || action.payload;
        if (state.currentBlog) {
          state.relatedBlogs = state.blogs.filter(
            (blog) =>
              blog.category === state.currentBlog?.category &&
              blog._id !== state.currentBlog?._id
          );
        }
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(likeBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const updatedBlog = action.payload.blog || action.payload;
        if (updatedBlog) {
          state.currentBlog = updatedBlog;
          const index = state.blogs.findIndex(
            (b) => b._id === updatedBlog._id
          );
          if (index !== -1) {
            state.blogs[index] = updatedBlog;
          }
        }
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const updatedBlog = action.payload.blog || action.payload;
        if (updatedBlog) {
          state.currentBlog = updatedBlog;
          const index = state.blogs.findIndex(
            (b) => b._id === updatedBlog._id
          );
          if (index !== -1) {
            state.blogs[index] = updatedBlog;
          }
        }
      });
  },
});

export default blogsSlice.reducer;
