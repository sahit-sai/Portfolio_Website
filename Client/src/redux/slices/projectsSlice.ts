import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api";

// Async thunk for fetching projects
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/projects");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData: any, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.post("/projects", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    { id, projectData }: { id: string; projectData: any },
    { getState, rejectWithValue }
  ) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      const response = await apiClient.put(`/projects/${id}`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token =
        (getState() as any).auth.token || localStorage.getItem("token");
      await apiClient.delete(`/projects/${id}`, {
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

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        const projectsData = action.payload?.projects || action.payload;
        state.projects = Array.isArray(projectsData) ? projectsData : [];
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
        const index = state.projects.findIndex(
          (p: any) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p: any) => p._id !== action.payload
        );
      });
  },
});

export default projectsSlice.reducer;
