// Core
import { Injectable }               from '@angular/core';

// Model
import { ContactUs }                  from './contact-us';

// Service
import { ApiService }               from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

constructor(private apiService: ApiService) { }

  getAll(){
    return this.apiService.get("/contact")
                          .pipe(map(data => data));
  }

  sendContact(data): Observable<ContactUs>{

    let contact = {
        id              : data.id,
        full_name       : data.full_name,
        email           : data.email,
        message         : data.message
    }
        return this.apiService.post("/contact", contact).pipe(map(data => data))
  }

}
