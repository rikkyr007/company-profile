import { Component, OnInit } from '@angular/core';

// Shared Service
import { DynamicScriptLoaderService }                           from '../shared/services/dynamic-script.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private dynamicScriptLoader   : DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts()
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Bootstrap','AdminLTE').then(data => {
    }).catch(error => console.log(error));
  }

}
