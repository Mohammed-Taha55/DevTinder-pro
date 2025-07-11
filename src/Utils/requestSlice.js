import { createSlice } from "@reduxjs/toolkit";

const resquestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: ( state, action ) => action.payload,
       removeRequests: (state, action) => {
  return state.filter(r => r._id !== action.payload); // ✅ Correct logic
}
    },
});
export const { addRequests, removeRequests } = resquestSlice.actions;
export default resquestSlice.reducer;