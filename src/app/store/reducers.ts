import { createReducer, on } from '@ngrx/store';
import { TImageResponse } from '../modules/image/types/image.types';
import { loadImages, loadImagesFailure, loadImagesSuccess } from './actions';

export interface ImagesState {
  images: TImageResponse[];
  loading: boolean;
  error: any;
}

export const initialState: ImagesState = {
  images: [],
  loading: false,
  error: null,
};

export const imagesReducer = createReducer(
  initialState,
  on(loadImages, (state) => ({ ...state, loading: true })),
  on(loadImagesSuccess, (state, { images }) => ({
    ...state,
    images,
    loading: false,
  })),
  on(loadImagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
