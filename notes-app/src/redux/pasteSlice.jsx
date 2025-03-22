import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';
import toast from 'react-hot-toast';
const initialState = {
    pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],  
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,

  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
        state.pastes.push(paste);
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success("Paste added successfully");
     
    },
    updateToPaste: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id); 
      if(index >=0){
        state.pastes[index] = paste; 
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");

      }
      
    
    },
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');  
      
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      console.log("Removing Paste ID:", pasteId);
    
      // ✅ Corrected ID reference from `item.id` to `item._id`
      state.pastes = state.pastes.filter((item) => item._id !== pasteId);
    
      // ✅ Save updated state to localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
      // ✅ Show a single toast message
      toast.success("Paste removed successfully!");
    },
    
  },
})


export const { addToPastes, updateToPaste, resetAllPaste,removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer