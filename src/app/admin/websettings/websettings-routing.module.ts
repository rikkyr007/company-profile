import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { WebsettingsComponent }          from './websettings.component';

const routes: Routes = [
    { path: '', component: WebsettingsComponent}

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class WebsettingsRoutingModule { }