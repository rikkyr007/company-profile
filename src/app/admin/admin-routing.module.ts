import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from '../../environments/environment'

// Package
import { AdminComponent }                   from './admin.component';


const routes: Routes = [
  {   path: '',             
      component: AdminComponent,
      children: [
          { path : '',                            redirectTo  : 'dashboard'},
          { path : 'dashboard',                   loadChildren: "./dashboard/dashboard.module#DashboardModule"},
          { path : '**', redirectTo: '', pathMatch: 'full' }
      ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { }