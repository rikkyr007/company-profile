import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { AboutManagementComponent }          from './about-management.component';

const routes: Routes = [
    { path: '', component: AboutManagementComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AboutManagementRoutingModule { }