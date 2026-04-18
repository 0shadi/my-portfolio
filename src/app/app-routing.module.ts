import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './pages/cover/cover.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cover-page',
    pathMatch: 'full'
  },
  {
    path: 'cover-page',
    component: CoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
