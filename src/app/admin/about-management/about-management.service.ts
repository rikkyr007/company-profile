// Core
import { Injectable }            from '@angular/core';

// Model
import { AboutManagement }       from './about-management';

// Service
import { ApiService }            from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }            from 'rxjs';
import { map }                   from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AboutManagementService {
    constructor(private apiService: ApiService) { }

    saveAbout(data): Observable<AboutManagement> {

        let db = {
            "id"                    : data.id,
            "about_description"     : data.about_description,
            "status": data.status === null ? 0 : data.status
        }
        if (db.id === null){
            return this.apiService.post("/abouts", db)
                .pipe(map(data => data));
        }else{
            return this.apiService.put("/abouts/" + db.status, db)
                .pipe(map(data => data));
        }
    }

    getAboutByStatus(status: String): Observable<AboutManagement> {
        return this.apiService.get("/abouts/" + status)
            .pipe(map(data => data));
    }
}
