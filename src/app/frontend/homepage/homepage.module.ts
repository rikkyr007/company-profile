import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { HomepageRoutingModule }               from "./homepage-routing.module";

// Component
import { HomepageComponent }               from "./homepage.component";

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  declarations: [HomepageComponent]
})
export class HomepageModule {}