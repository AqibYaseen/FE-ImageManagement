import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImagesState } from './reducers';

export const selectImagesState = createFeatureSelector<ImagesState>('images');

export const selectAllImages = createSelector(
  selectImagesState,
  (state: ImagesState) => state.images
);

export const selectImagesLoading = createSelector(
  selectImagesState,
  (state: ImagesState) => state.loading
);

export const selectImagesError = createSelector(
  selectImagesState,
  (state: ImagesState) => state.error
);
