import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { FoodpediaComponent }                from './foodpedia.component';


const routes: Routes = [
    { path: '',                         component: FoodpediaComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FoodpediaRoutingModule { }