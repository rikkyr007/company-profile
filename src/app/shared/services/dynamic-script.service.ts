import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'DataTablesJpa',        src: `${environment.assets_url}assets/backend/modules/datatables/datatables.jquery.js` },
  { name: 'DataTables',           src: `${environment.assets_url}assets/backend/modules/datatables/datatables.min.js` },
  { name: 'Popper',               src: `${environment.assets_url}assets/frontend/js/plugins/popper.min.js` },
  { name: 'Bootstrap',            src: `${environment.assets_url}assets/backend/adminlte/plugins/bootstrap/js/bootstrap.min.js` },
  { name: 'AdminLTE',             src: `${environment.assets_url}assets/backend/adminlte/dist/js/adminlte.min.js` },
  { name: 'OverlayScrollbars',    src: `${environment.assets_url}assets/backend/adminlte/plugins/overlayscrollbars/jquery.overlayScrollbars.min.js` }
];
               
declare var document: any;

@Injectable()

export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {

    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });

   }

   load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  
}
