import { Component, OnInit, HostListener } from '@angular/core';

import { MenusettingsService }        from '../../../admin/menusettings/menusettings.service' 
import { WebSettingsService }         from '../../../admin/websettings/websettings.service'

import { WebSettings }                from '../../../admin/websettings/websettings'

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(  private menusettingsService     : MenusettingsService,
                private websettingsService      : WebSettingsService
    ) { }

  ngOnInit() {
    this.getListMenu()
    this.initSetting()
  }

  image_url                   = environment.image_url
  prefix             : String = environment.prefix

  logoFbUrl          : String = null; 
  logoIgUrl          : String = null;
  logoTwitUrl        : String = null;
  bannerUrl          : String = null;

  menu_name : String = null
  ListMenu = []
  websetting: WebSettings

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.remove('bg-transparent');
      element.classList.add('navbar-dark');
      element.classList.add('bg-dark');
      element.classList.add('toggle-nav');
    } else {
      element.classList.remove('toggle-nav');
      element.classList.remove('bg-dark');
      element.classList.remove('navbar-dark');
      element.classList.add('bg-transparent');
    }
  }

  public getListMenu(){
    this.menusettingsService.getAll().subscribe((data) => {
      this.ListMenu = data
    })
  }

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
