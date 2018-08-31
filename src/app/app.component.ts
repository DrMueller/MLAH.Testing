/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public test(): void {
    let tra: jasmine.Any;
  }
}
