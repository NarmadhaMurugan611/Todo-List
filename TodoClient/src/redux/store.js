import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import { TaskSlice } from "./TaskSlice";


const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    Tasks: TaskSlice.reducer,
  }
})

export default store
