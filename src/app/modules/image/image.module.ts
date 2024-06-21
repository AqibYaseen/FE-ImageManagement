import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    ImageComponent,
    ListComponent,
    HomeComponent,
    AddImageComponent,
    EditImageComponent,
    ImageCardComponent,
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class ImageModule {}
