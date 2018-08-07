import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  isActive(path) {
    console.log('PATH', path);
    const x = this.router.url.indexOf(path) > -1;
    console.log('INDEX OF', x);

    return x;
    // return this.router.url.indexOf(path) > -1;
  }
}
