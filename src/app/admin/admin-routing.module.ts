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
          { path : 'feature',                     loadChildren: "./feature/feature.module#FeatureModule"},
          { path : 'menusettings',                loadChildren: "./menusettings/menusettings.module#MenusettingsModule"}
      ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }