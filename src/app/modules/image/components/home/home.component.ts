import { Component, inject, Input, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { TImageResponse } from '../../types/image.types';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddImageComponent } from '../add-image/add-image.component';
import { Store } from '@ngrx/store';
import { ImagesState } from 'src/app/store/reducers';
import { loadImages } from 'src/app/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {}
  store = inject(Store<{ images: ImagesState }>);
  addImage() {
    const dialog = this.dialog.open(AddImageComponent, { width: '40vw' });

    dialog.afterClosed().subscribe({
      next: () => {
        this.store.dispatch(loadImages());
      },
    });
  }
}
