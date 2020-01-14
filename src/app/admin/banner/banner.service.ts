// Core
import { Injectable } from '@angular/core';

// Model
import { Banner }       from './banner';

// Service
import { ApiService }   from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable }   from 'rxjs';
import { map }          from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BannerService {
    constructor(private apiService: ApiService) { }

    saveBanner(data): Observable<Banner> {

        let db = {
            "id"                    : data.id,
            "banner_title"          : data.banner_title,
            "banner_description"    : data.banner_description,
            "banner_button_link"    : data.banner_button_link,
            "banner_image"          : data.banner_image,
            "status": data.status === null ? 0 : data.status
        }
        if (db.id === null){
            return this.apiService.post("/banners", db)
                .pipe(map(data => data));
        }else{
            return this.apiService.put("/banners/" + db.status, db)
                .pipe(map(data => data));
        }
    }

    getSettingByStatus(status: String): Observable<Banner> {
        return this.apiService.get("/banners/" + status)
            .pipe(map(data => data));
    }
}
