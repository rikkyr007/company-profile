import { Component, OnInit }          from '@angular/core';

import { WebSettingsService }         from '../../../admin/websettings/websettings.service'

// Environtment
import { environment }                from 'src/environments/environment';

// Model
import { WebSettings }                from '../../../admin/websettings/websettings'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private websettingsService      : WebSettingsService) { }

  ngOnInit() {
    this.initSetting()
  }

  image_url                   = environment.image_url
  prefix             : String = environment.prefix
  logoFbUrl          : String = null; 
  logoIgUrl          : String = null;
  logoTwitUrl        : String = null;
  
  websetting: WebSettings;

  private initSetting(){
    return this.websettingsService.getSettingByStatus("0").subscribe((data) => {
      this.websetting = data
      
      if(data.logo_fb){
          this.logoFbUrl = this.image_url + data.logo_fb
          }

      if (data.logo_twitter){
        this.logoTwitUrl = this.image_url + data.logo_twitter
      }

      if (data.logo_instagram){
        this.logoIgUrl = this.image_url + data.logo_instagram
      }

    })

  }

}
