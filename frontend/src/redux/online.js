import { createSlice } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
    name:"online",
    initialState:{
        onlineUsers: []
    },
    reducers:{
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
})

export const {setOnlineUsers} = onlineSlice.actions;
export default onlineSlice.reducer;