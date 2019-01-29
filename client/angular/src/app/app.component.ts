import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketManager } from './SocketManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private socket;

  constructor(private router: Router, private socketManager: SocketManager) {
  }

  isActive(path) {
    return this.router.url.indexOf(path) > -1;
  }
}
