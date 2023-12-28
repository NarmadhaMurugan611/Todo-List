import { createSlice } from '@reduxjs/toolkit'

export const TaskSlice = createSlice({
  name: 'Task',
  initialState: {
    task: [],
  },
  reducers: {
    GetTask: (state,action) => {
      state.task = action.payload
    },
  
  },
})

export const { GetTask } = TaskSlice.actions

export default TaskSlice.reducer