import { Component, OnInit } from '@angular/core';


//service
import { FoodpediaManagementService }        from '../../admin/foodpedia-management/foodpedia-management.service' 

//model 
import { FoodpediaManagement } from '../../admin/foodpedia-management/foodpedia-management';

// Environtment
import { environment }                from 'src/environments/environment';

@Component({
  selector: 'app-foodpedia',
  templateUrl: './foodpedia.component.html',
  styleUrls: ['./foodpedia.component.css']
})
export class FoodpediaComponent implements OnInit {

  constructor(
              private foodpediaManagementService : FoodpediaManagementService
              ) { }

  ngOnInit() {
    this.initFoodpedia();
  }

  image_url                = environment.image_url
  ListFoodpedia   : FoodpediaManagement;
  image1          : String = null;
  image2          : String = null;
  tagimage1       : String = null;
  tagimage2       : String = null;

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private initFoodpedia(){
    return this.foodpediaManagementService.getAll().subscribe((data) => {
       this.ListFoodpedia = data
       if(data.foodpedia_image1){
        this.image1 = this.image_url + data.foodpedia_image1
       }
       if(data.foodpedia_image2){
        this.image2 = this.image_url + data.foodpedia_image2
       }
       if(data.foodpedia_tagimage1){
        this.tagimage1 = this.image_url + data.foodpedia_tagimage1
       }
       if(data.foodpedia_tagimage2){
        this.tagimage2 = this.image_url + data.foodpedia_tagimage2
       }
    })
    }

}
