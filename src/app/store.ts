import { configureStore } from "@reduxjs/toolkit";
import reducerFilmList from '../features/sliceFilmList';
import reducerCounterPage from '../features/pageCounterSlice';

const store = configureStore({
  reducer: {
    filmList: reducerFilmList,
    pageCounter: reducerCounterPage,
  },
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
