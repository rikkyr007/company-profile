import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { FoodpediaManagementComponent }                 from './foodpedia-management.component';

const routes: Routes = [
    { path: '', component: FoodpediaManagementComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FoodpediaManagementRoutingModule { }