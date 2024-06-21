import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';

@NgModule({
  declarations: [ImageComponent, ListComponent, HomeComponent, AddImageComponent, EditImageComponent],
  imports: [CommonModule, ImageRoutingModule],
})
export class ImageModule {}
