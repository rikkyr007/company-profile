import { Component, OnInit } from '@angular/core';

//service
import { AboutManagementService }        from '../../admin/about-management/about-management.service' 

//model 
import { AboutManagement } from '../../admin/about-management/about-management';

// Environtment
import { environment }                from 'src/environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
                private aboutManagementService : AboutManagementService
  ) { }

  ngOnInit() {
    this.initAbout();
  }

  ListAbout:  AboutManagement
  aboutDesc: String = null;

  private initAbout(){
    return this.aboutManagementService.getAboutByStatus("0").subscribe((data) => {
      this.ListAbout = data
      if(data.about_description){
        this.aboutDesc = data.about_description
    }
    })
  }

}
