import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { ContactDetailComponent }          from './contact-detail.component';


const routes: Routes = [
    { path: '', component: ContactDetailComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ContactDetailRoutingModule { }