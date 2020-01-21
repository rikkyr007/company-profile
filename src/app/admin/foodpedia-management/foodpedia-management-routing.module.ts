import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { FoodpediaManagementComponent }                 from './foodpedia-management.component';
import { FoodpediaManagementEditComponent }             from './foodpedia-management-edit/foodpedia-management-edit.component'

const routes: Routes = [
    { path: '', component: FoodpediaManagementComponent},
    { path: 'edit/:id', component: FoodpediaManagementEditComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FoodpediaManagementRoutingModule { }