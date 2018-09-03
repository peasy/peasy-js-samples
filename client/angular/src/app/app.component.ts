import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private socket;

  constructor(private router: Router) {
    this.socket = io();
  }

  isActive(path) {
    return this.router.url.indexOf(path) > -1;
  }
}
