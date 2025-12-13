import { createSlice } from "@reduxjs/toolkit"

interface IState{
  isOpen:boolean
}
const initialState:IState = {
  isOpen:false
}
const globalSlice = createSlice({
  name:"global",
  initialState,
  reducers:{
    onOpenCart:(state)=>{
      state.isOpen=true
    },
    onCloseCart:(state)=>{
      state.isOpen=false
    },

  }
})

export const { onOpenCart, onCloseCart } = globalSlice.actions;
export const selectGlobal = (state:{global:IState}) => state.global;

export default globalSlice.reducer;