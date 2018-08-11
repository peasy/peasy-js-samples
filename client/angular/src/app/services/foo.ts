import { Injectable } from '@angular/core';
import { Bar } from './bar';


@Injectable({ providedIn: 'root' })
export class Foo {

  constructor(public bar: Bar) {
  }

}
