import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { DataProxyFactory } from './data-proxies/data-proxy-factory';
import { SocketManager } from './SocketManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private socket;

  constructor(private router: Router, private proxyFactory: DataProxyFactory, private socketManager: SocketManager) {
    // this.socket = io();
    // this.socket.on('test', (msg) => {
    //   console.log('fROM sErVER', msg);
    // });
    console.log('proxy factory', proxyFactory);
  }

  isActive(path) {
    return this.router.url.indexOf(path) > -1;
  }
}
