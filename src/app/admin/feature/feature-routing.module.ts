import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { FeatureComponent }          from './feature.component';


const routes: Routes = [
    { path: '', component: FeatureComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FeatureRoutingModule { }