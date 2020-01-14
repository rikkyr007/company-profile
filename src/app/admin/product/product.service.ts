// Core
import { Injectable }               from '@angular/core';

// Model
import { Product }                  from './product';

// Service
import { ApiService }               from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private apiService: ApiService) { }

  getAll(){
    return this.apiService.get("/product")
                  .pipe(map(data => data));
  }

  saveProduct(data): Observable<Product>{

    let product = {
            id                   : data.id,
            product_description  : data.product_description,
            product_name         : data.product_name,
            product_price        : data.product_price,
            product_image        : data.product_image
    }

    if(product.id){
      return this.apiService.put("/product/" + product.id , product)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/product", product)
                    .pipe(map(data => data));
    }
    
  }

  updateProduct(id, data): Observable<Product> {

    let product = {
            id                   : data.id,
            product_description  : data.product_description,
            product_name         : data.product_name,
            product_price        : data.product_price,
            product_image        : data.product_image
    }
    return this.apiService.put("/product/" + id, product)
        .pipe(map(data => data))
  }

  getProductById(id: string): Observable<Product>{
    return this.apiService.get("/product/" + id)
                .pipe(map(data => data));
  }

  destroyProduct(id: string): Observable<Product>{
    return this.apiService.delete("/product/" + id)
                .pipe(map(data => data));
  }
}
