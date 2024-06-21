import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ImageService } from '../modules/image/services/image.service';
import { loadImages, loadImagesFailure, loadImagesSuccess } from './actions';

@Injectable()
export class ImagesEffects {
  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadImages),
      mergeMap(() =>
        this.imagesService.getAllImages().pipe(
          map((images) => {
            const data = images.data;
            return loadImagesSuccess({ images: data });
          }),
          catchError((error) => of(loadImagesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private imagesService: ImageService) {}
}
