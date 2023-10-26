import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[],
    filtredJobs: [],
    initialized: false,
};

const jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
      setJobs: (state, action) => {
        state.jobs = action.payload;
        state.filtredJobs = action.payload;
        state.initialized = true;
      },
      addJob: (state, action) => {
        state.jobs.push(action.payload);
      },
      filterBySearch: (state, action) => {
        const query = action.payload.toLowerCase();
  
        const filtred = state.jobs.filter((job) =>
          job.company.toLowerCase().includes(query)
        );
  
        state.filtredJobs = filtred;
      },
  
      filterByStatus: (state, action) => {
        state.filtredJobs = state.jobs.filter(
          (job) => job.status === action.payload
        );
      },
  
      filterByType: (state, action) => {
        state.filtredJobs = state.jobs.filter(
          (job) => job.type === action.payload
        );
      },

      sortJobs: (state, action) => {
        switch (action.payload) {
          case 'a-z':
            state.filtredJobs.sort((a, b) => {
              if (a.company < b.company) return -1;
              if (a.company > b.company) return 1;
              return 0;
            });
            break;
          case 'z-a':
            state.filtredJobs.sort((a, b) => {
              if (a.company < b.company) return 1;
              if (a.company > b.company) return -1;
              return 0;
            });
  
          case 'En Yeni':
            state.filtredJobs.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
  
          case 'En Eski':
            state.filtredJobs.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
  
          default:
            break;
        }
  
        return state;
      },
      clearFilters: (state) => {
        state.filtredJobs = state.jobs;
      },
    },
  });

export const {
    setJobs, 
    addJob, 
    filterBySearch, 
    filterByStatus, 
    filterByType,
    sortJobs,
    clearFilters
}  = jobSlice.actions;

export default jobSlice.reducer;