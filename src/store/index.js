import { configureStore } from '@reduxjs/toolkit'
import AviaReducer from './AviaSlice'

export default configureStore(
  {
    reducer: {
      aviaApp: AviaReducer,
    },
  },
)
