// Core
import { Injectable }               from '@angular/core';

// Model
import { Feature }                  from './feature';

// Service
import { ApiService }               from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

constructor(private apiService: ApiService) { }

  getAll(){
    return this.apiService.get("/feature")
                  .pipe(map(data => data));
  }

  saveFeature(data): Observable<Feature>{

    let feature = {
        id                   : String,
        feature_description  : String,
        feature_image        : String,
        feature_name         : String
    }

    if(feature.id){
      return this.apiService.put("/feature/" + feature.id , feature)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/feature", feature)
                    .pipe(map(data => data));
    }
    
  }

  getFeatureById(id: string): Observable<Feature>{
    return this.apiService.get("/feature/" + id)
                .pipe(map(data => data));
  }

  destroyFeature(id: string): Observable<Feature>{
    return this.apiService.delete("/feature/" + id)
                .pipe(map(data => data));
  }
}
