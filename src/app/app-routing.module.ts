import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomepageComponent }      from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent 
  },
  {
    path: 'admin',
    loadChildren: "./admin/admin.module#AdminModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
