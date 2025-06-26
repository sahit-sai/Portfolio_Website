import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../api";
import { Blog } from "../../types"; // Assuming you have a types file

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
      const response = await apiClient.get("/blogs");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single blog
export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/blogs/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a blog
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData: any, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.post("/blogs", blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (
    { id, blogData }: { id: string; blogData: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.put(`/blogs/${id}`, blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
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
      await apiClient.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching related blogs
export const getRelatedBlogs = createAsyncThunk(
  "blogs/getRelatedBlogs",
  async (tags: string[], { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/blogs/related?tags=${tags.join(",")}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for liking a blog
export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/blogs/${id}/like`);
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
    { blogId, commentData }: { blogId: string; commentData: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.post(
        `/blogs/${blogId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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
      .addCase(getBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(likeBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Blog>) => {
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      });
  },
});

export default blogsSlice.reducer;
