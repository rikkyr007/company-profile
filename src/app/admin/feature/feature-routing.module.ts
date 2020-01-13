import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { FeatureComponent }          from './feature.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';

const routes: Routes = [
    { path: '', component: FeatureComponent},
    { path: 'edit/:id', component: FeatureEditComponent }

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FeatureRoutingModule { }