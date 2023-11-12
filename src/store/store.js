import { configureStore } from '@reduxjs/toolkit'
import { datasetSlice } from './counterDataset'

export default configureStore({
  reducer: {
    dataset: datasetSlice.reducer,
  },
})