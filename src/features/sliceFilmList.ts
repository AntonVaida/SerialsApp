import { Film } from "src/types/Film";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilmList } from "../../src/services/getFilmLIst";
import { RootState } from "../app/store";

type FilmList = {
  filmList: Film[] | [],
  error: string | null,
  loading: boolean,
  loadingNextPage: boolean,
  nonResult: boolean,
  nextPageIsEmpty: boolean,
};

const initialState: FilmList = {
  filmList: [],
  error: null,
  loading: false,
  loadingNextPage: false,
  nonResult: false,
  nextPageIsEmpty: false,
};

export const sliceFilmList = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSearchStatus: (state, action) => {
      state.nonResult = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFilms.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.nonResult = false
    })
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.filmList = action.payload.list;
      state.error = null;
      state.loading = false;
      state.nextPageIsEmpty = action.payload.nextPageEmpty;
    })
    builder.addCase(fetchFilms.rejected, (state) => {
      state.error = 'ERROR: error loaded film list';
      state.loading = false;
      state.loadingNextPage = false;
      state.nonResult = false
    })
  },
})

type Params = {
  query: string,
  page: number,
};

export const fetchFilms = createAsyncThunk('films/fetch', async ({query, page}: Params, { getState }) => {
    const state = getState() as RootState;
    if (page === 1) {
      const response = await getFilmList(query, page);
      return {list: response, nextPageEmpty: false};
    } else {
      const existingData = state.filmList.filmList;
      const response = await getFilmList(query, page);
      const idList = existingData.map((film: Film) => film.show.id)
      const updateList = response.filter((film: Film) => !idList.includes(film.show.id));
      const nextPageEmpty = updateList.length ? false : true;
      return {list: [...existingData, ...updateList], nextPageEmpty};
    }
  });

export const { setSearchStatus } = sliceFilmList.actions;
export default sliceFilmList.reducer;
