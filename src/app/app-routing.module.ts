import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'image', redirectTo: '/image', pathMatch: 'full' },
  {
    path: 'image',
    loadChildren: () =>
      import('./modules/image/image.module').then((m) => m.ImageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
