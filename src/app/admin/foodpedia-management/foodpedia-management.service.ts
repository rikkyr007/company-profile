// Core
import { Injectable } from '@angular/core';

// Model
import { FoodpediaManagement }       from './foodpedia-management';

// Service
import { ApiService }   from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }   from 'rxjs';
import { map }          from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FoodpediaManagementService {
    constructor(private apiService: ApiService) { }

  getAll(){
    return this.apiService.get("/foodpedia")
                  .pipe(map(data => data));
  }

  saveFeature(data): Observable<FoodpediaManagement>{

    let foodpedia = {
        id                      : data.id,
        foodpedia_title         : data.foodpedia_title,
        foodpedia_description   : data.foodpedia_description,
        foodpedia_image1        : data.foodpedia_image1,
        foodpedia_image2        : data.foodpedia_image2,
        foodpedia_tagimage1     : data.foodpedia_tagimage1,
        foodpedia_tagimage2     : data.foodpedia_tagimage2,
        foodpedia_desctag1      : data.foodpedia_desctag1,
        foodpedia_desctag2      : data.foodpedia_desctag2
    }

    if(foodpedia.id){
      return this.apiService.put("/foodpedia/" + foodpedia.id , foodpedia)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/foodpedia", foodpedia)
                    .pipe(map(data => data));
    }
  }

  updateFeature(id, data): Observable<FoodpediaManagement> {

    let foodpedia = {
        id                      : data.id,
        foodpedia_title         : data.foodpedia_title,
        foodpedia_description   : data.foodpedia_description,
        foodpedia_image1        : data.foodpedia_image1,
        foodpedia_image2        : data.foodpedia_image2,
        foodpedia_tagimage1     : data.foodpedia_tagimage1,
        foodpedia_tagimage2     : data.foodpedia_tagimage2,
        foodpedia_desctag1      : data.foodpedia_desctag1,
        foodpedia_desctag2      : data.foodpedia_desctag2
    }

    return this.apiService.put("/foodpedia/" + id, foodpedia)
        .pipe(map(data => data))
  }

  getFoodpediaById(id: string): Observable<FoodpediaManagement>{
    return this.apiService.get("/foodpedia/" + id)
                .pipe(map(data => data));
  }

  destroyFoodpedia(id: string): Observable<FoodpediaManagement>{
    return this.apiService.delete("/foodpedia/" + id)
                .pipe(map(data => data));
  }
}
