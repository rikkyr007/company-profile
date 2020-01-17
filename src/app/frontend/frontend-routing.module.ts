import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from '../../environments/environment'

// Package
import { FrontendComponent }                   from './frontend.component';


const routes: Routes = [
  {   path: '',             
      component: FrontendComponent,
      children: [
          { path : '',                            loadChildren: "./homepage/homepage.module#HomepageModule"},
          { path : 'about',                       loadChildren: "./about/about.module#AboutModule"}
      ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class FrontendRoutingModule { }