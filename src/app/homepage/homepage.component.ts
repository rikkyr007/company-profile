import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

import { faFilm, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  filmIcon = faFilm;
  coffeeIcon = faCoffee;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.remove('bg-transparent');
      element.classList.add('navbar-dark');
      element.classList.add('bg-primary');
      element.classList.add('toggle-nav');
    } else {
      element.classList.remove('toggle-nav');
      element.classList.remove('bg-primary');
      element.classList.remove('navbar-dark');
      element.classList.add('bg-transparent');
    }
  }

}
