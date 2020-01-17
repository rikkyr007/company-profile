import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { HomepageComponent }                from './homepage.component';


const routes: Routes = [
    { path: '',                         component: HomepageComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class HomepageRoutingModule { }