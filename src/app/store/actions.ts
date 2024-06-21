import { createAction, props } from '@ngrx/store';
import { TImageResponse } from '../modules/image/types/image.types';

export const loadImages = createAction('[Images] Load Images');
export const loadImagesSuccess = createAction(
  '[Images] Load Images Success',
  props<{ images: TImageResponse[] }>()
);
export const loadImagesFailure = createAction(
  '[Images] Load Images Failure',
  props<{ error: any }>()
);
