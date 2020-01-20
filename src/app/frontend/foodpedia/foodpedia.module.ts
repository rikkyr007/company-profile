import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { FoodpediaRoutingModule }               from "./foodpedia-routing.module"
import { FoodpediaComponent }               from "./foodpedia.component";

@NgModule({
  imports: [
    CommonModule,
    FoodpediaRoutingModule
  ],
  declarations: [FoodpediaComponent]
})
export class FoodpediaModule {}