// Core
import { Injectable } from '@angular/core';

// Model
import { WebSettings } from './websettings';

// Service
import { ApiService } from '../../shared/services/api.service';

// Dependency Injection RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebSettingsService {
    constructor(private apiService: ApiService) { }

    saveWebSettings(data): Observable<WebSettings> {

        let websettings = {
            "id":data.id,
            "web_tittle": data.web_tittle,
            "address": data.address,
            "status": data.status === null ? 0 : data.status,
            "copyright": data.copyright,
            "email": data.email,
            "logo_fb": data.logo_fb,
            "logo_instagram": data.logo_instagram,
            "logo_twitter": data.logo_twitter,
            "no_fax": data.no_fax,
            "no_telp": data.no_telp,
    }
        if (websettings.id === null){
            return this.apiService.post("/websetting", websettings)
                .pipe(map(data => data));
        }else{
            return this.apiService.put("/websetting/" + websettings.status, websettings)
                .pipe(map(data => data));
        }
    }


    getSettingByStatus(status: String): Observable<WebSettings> {
        return this.apiService.get("/websetting/" + status)
            .pipe(map(data => data));
    }
}
