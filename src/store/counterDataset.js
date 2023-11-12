import { createSlice } from '@reduxjs/toolkit'

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState: {
        value: [],
    },
    reducers: {
        increment: (state, action) => {
            state.value.push(action.payload);
        },
        decrement: (state, action) => {
            state.value.splice(action.payload,1);
        },
        update: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { increment, decrement, update } = datasetSlice.actions

export default datasetSlice.reducer