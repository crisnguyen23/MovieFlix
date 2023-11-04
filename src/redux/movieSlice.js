import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../utils/api";
import tmdbAPI from "../utils/httpRequest";

export const fetchGenreList = createAsyncThunk(
  "movies/fetchGenreList",
  async () => {
    const res = await tmdbAPI.get(`/genre/movie/list`, {
      params: {
        api_key: APIKey,
        language: "en-US",
      },
    });
    return res.data.genres;
  },
);

export const fetchMovieListGenre = createAsyncThunk(
  "movies/fetchMovieListGenre",
  async ({ key, id }) => {
    const res = await tmdbAPI.get(`/discover/movie`, {
      params: {
        api_key: APIKey,
        [key]: id,
        page: 1,
      },
    });
    return res.data.results;
  },
);

export const fetchMoviePopular = createAsyncThunk(
  "movies/fetchMoviePopular",
  async () => {
    const res = await tmdbAPI.get(`/movie/popular`, {
      params: {
        api_key: APIKey,
        language: "en-US",
        page: 1,
      },
    });
    return res.data.results;
  },
);

export const fetchMovieTrendingWeek = createAsyncThunk(
  "movies/fetchMovieTrendingWeek",
  async () => {
    const res = await tmdbAPI.get(`/trending/movie/week`, {
      params: {
        api_key: APIKey,
        language: "en-US",
        page: 1,
      },
    });
    return res.data.results;
  },
);

export const fetchMovieUpcoming = createAsyncThunk(
  "movies/fetchMovieUpcoming",
  async () => {
    const res = await tmdbAPI.get(`/movie/upcoming`, {
      params: {
        api_key: APIKey,
        language: "en-US",
        page: 1,
      },
    });
    return res.data.results;
  },
);

export const fetchMovieTopRated = createAsyncThunk(
  "movies/fetchMovieTopRated",
  async () => {
    const res = await tmdbAPI.get(`/movie/top_rated`, {
      params: {
        api_key: APIKey,
        language: "en-US",
        page: 1,
      },
    });
    return res.data.results;
  },
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fechSearchMovies",
  async (searchValue) => {
    const res = await tmdbAPI.get("/search/movie", {
      params: {
        api_key: APIKey,
        page: 1,
        query: searchValue,
      },
    });
    return res.data.results;
  },
);

export const fetchSearchPage = createAsyncThunk(
  "movies/fetchSearchPage",
  async (searchValue) => {
    const res = await tmdbAPI.get("/search/movie", {
      params: {
        api_key: APIKey,
        page: 1,
        query: searchValue,
      },
    });
    return res.data.results;
  },
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const res = await tmdbAPI.get(`/movie/${id}`, {
      params: {
        api_key: APIKey,
        append_to_response: "videos,casts,releases",
      },
    });
    return res.data;
  },
);

export const fetchMovieSimilar = createAsyncThunk(
  "movies/fetchMovieSimilar",
  async (id) => {
    const res = await tmdbAPI.get(`/movie/${id}/similar`, {
      params: {
        api_key: APIKey,
        language: "en-US",
        page: 1,
      },
    });
    return res.data.results;
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    loadingPage: "",
    status: "",
    searchResults: [],
    searchPage: [],
    genreList: [],
    movieList: [],
    moviePopular: [],
    movieTrending: [],
    movieUpcoming: [],
    movieTopRated: [],
    movieDetail: [],
    movieSimilar: [],
  },
  reducers: {
    removeSearchResults: (state) => {
      state.searchResults = [];
    },
    removeMovieList: (state) => {
      state.movieList = [];
    },
    removeMovieDetail: (state) => {
      state.movieDetail = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.status = "";
      })
      .addCase(fetchSearchPage.fulfilled, (state, action) => {
        state.searchPage = action.payload;
      })
      .addCase(fetchGenreList.fulfilled, (state, action) => {
        state.genreList = action.payload;
      })
      // .addCase(fetchGenreList.fulfilled, (state, action) => {
      //   state.loadingPage = false;
      // })
      .addCase(fetchMovieListGenre.fulfilled, (state, action) => {
        state.movieList = action.payload;
      })
      .addCase(fetchMoviePopular.pending, (state) => {
        state.loadingPage = false;
      })
      .addCase(fetchMoviePopular.fulfilled, (state, action) => {
        state.moviePopular = action.payload;
        state.loadingPage = true;
      })
      .addCase(fetchMovieTrendingWeek.fulfilled, (state, action) => {
        state.movieTrending = action.payload;
      })
      .addCase(fetchMovieUpcoming.fulfilled, (state, action) => {
        state.movieUpcoming = action.payload;
      })
      .addCase(fetchMovieTopRated.fulfilled, (state, action) => {
        state.movieTopRated = action.payload;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieSimilar.fulfilled, (state, action) => {
        state.movieSimilar = action.payload;
      });
  },
});

export const { removeSearchResults, removeMovieDetail, removeMovieList } =
  movieSlice.actions;
export default movieSlice.reducer;
