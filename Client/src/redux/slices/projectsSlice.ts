import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/projects';

// Async thunk for fetching projects
export const getProjects = createAsyncThunk('projects/getProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for adding a project
export const addProject = createAsyncThunk('projects/addProject', async (projectData: FormData, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as any).auth.token || localStorage.getItem('token');
    const response = await axios.post(API_URL, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for updating a project
export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, projectData }: { id: string, projectData: FormData }, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as any).auth.token || localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as any).auth.token || localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    isLoading: false,
    isError: false,
    message: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p: any) => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p: any) => p._id !== action.payload);
      });
  },
});

export default projectsSlice.reducer;
