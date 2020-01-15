import { Component, OnInit }          from '@angular/core';
import { HostListener }               from '@angular/core';

import { faFilm, faCoffee }           from '@fortawesome/free-solid-svg-icons';

//service

import { MenusettingsService }        from '../admin/menusettings/menusettings.service' 
import { WebSettingsService }         from '../admin/websettings/websettings.service'
import { BannerService }              from '../admin/banner/banner.service'
import { ProductService }             from '../admin/product/product.service'
import { FeatureService }             from '../admin/feature/feature.service'

// Environtment
import { environment }                from 'src/environments/environment';

// Model
import { WebSettings }                from '../admin/websettings/websettings'
import { Banner }                     from '../admin/Banner/banner'
import { Product }                    from '../admin/product/product'
import { Feature }                    from '../admin/feature/feature'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  filmIcon                    = faFilm;
  coffeeIcon                  = faCoffee;
  image_url                   = environment.image_url
  prefix             : String = environment.prefix

  logoFbUrl          : String = null; 
  logoIgUrl          : String = null;
  logoTwitUrl        : String = null;
  bannerUrl          : String = null;

  constructor(  private menusettingsService     : MenusettingsService,
                private websettingsService      : WebSettingsService,
                private bannerService           : BannerService,
                private productService          : ProductService,
                private featureService          : FeatureService) { }

  ngOnInit() {
      this.getListMenu()
      this.initProduct()
      this.initFeature()
      this.initBanner()
      this.initSetting()
  }

    menu_name : String = null
    ListMenu = []
    websetting: WebSettings
    Listbanner:  Banner
    Listproduct: Product
    Listfeature: Feature

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.remove('bg-transparent');
      element.classList.add('navbar-light');
      element.classList.add('bg-light');
      element.classList.add('toggle-nav');
    } else {
      element.classList.remove('toggle-nav');
      element.classList.remove('bg-light');
      element.classList.remove('navbar-light');
      element.classList.add('bg-transparent');
    }
  }

  public getListMenu(){
    this.menusettingsService.getAll().subscribe((data) => {
      this.ListMenu = data
    })
  }

  private initProduct(){
    return this.productService.getAll().subscribe((data) => {
       this.Listproduct = data
    })
  }

 private initFeature(){
  return this.featureService.getAll().subscribe((data) => {
     this.Listfeature = data
  })
  }

  private initBanner(){
    return this.bannerService.getSettingByStatus("0").subscribe((data) => {
      this.Listbanner = data
      if(data.banner_image){
          this.bannerUrl = this.image_url + data.banner_image
      }
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
