import { Component, inject, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { TImageResponse, TImageUpdateRequest } from '../../types/image.types';
import { ImageService } from '../../services/image.service';
import { Store } from '@ngrx/store';
import { ImagesState } from 'src/app/store/reducers';
import {
  selectAllImages,
  selectImagesError,
  selectImagesLoading,
} from 'src/app/store/selectors';
import { loadImages } from 'src/app/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { EditImageComponent } from '../edit-image/edit-image.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() images$: Observable<TImageResponse[]> = of([]);
  loading$: Observable<boolean> = of(true);
  error$: Observable<string> = of('');
  service = inject(ImageService);
  store = inject(Store<{ images: ImagesState }>);
  dialog = inject(MatDialog);
  snack = inject(MatSnackBar);

  constructor() {
    this.images$ = this.store.select(selectAllImages);
    this.loading$ = this.store.select(selectImagesLoading);
    this.error$ = this.store.select(selectImagesError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadImages());
  }

  editImage(event: TImageResponse): void {
    console.log(event);
    const payload: TImageResponse = {
      dateCreated: event.dateCreated,
      description: event.description,
      id: event.id,
      url: event.url,
      user: event.user,
    };

    this.dialog
      .open(EditImageComponent, { data: payload, width: '50vw' })
      .afterClosed()
      .subscribe({
        next: (formData) => {
          if (!formData) return;
          const data: TImageUpdateRequest = {
            dateCreated: formData.dateCreated,
            description: formData.description,
            id: formData.id,
            url: formData.url,
            user: formData.user,
          };
          this.service.editImage(data).subscribe({
            next: (response) => {
              this.snack.open(response.message, '', { duration: 4000 });
              if (!response.isSuccess) {
              }
              this.store.dispatch(loadImages());
            },
          });
        },
      });
  }
  deleteImage(event: TImageResponse) {
    this.service.deleteImage(event.id).subscribe({
      next: (response) => {
        this.snack.open(response.message, '', { duration: 4000 });
        this.store.dispatch(loadImages());
      },
    });
  }
}
