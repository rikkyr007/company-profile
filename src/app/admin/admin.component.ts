import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

// Shared Service
import { DynamicScriptLoaderService }                           from '../shared/services/dynamic-script.service';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( private dynamicScriptLoader   : DynamicScriptLoaderService,
              @Inject(DOCUMENT) document, r: Renderer2) {
                r.addClass(document.body, 'hold-transition');
                r.addClass(document.body, 'sidebar-mini');
                r.addClass(document.body, 'layout-fixed');
               }

  ngOnInit() {
    this.loadScripts()
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Bootstrap','AdminLTE','OverlayScrollbars').then(data => {
    }).catch(error => console.log(error));
  }

}
