import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { AboutRoutingModule }               from "./about-routing.module";

// Component
import { AboutComponent }                   from "./about.component";

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule {}