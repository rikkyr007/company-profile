import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { DashboardRoutingModule }           from "./dashboard-routing.module";

// Component
import { DashboardComponent }               from "./dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}