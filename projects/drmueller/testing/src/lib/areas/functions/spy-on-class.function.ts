/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
/// <reference path="../../../../../../../node_modules/@types/jasminewd2/index.d.ts" />
import { Type } from '@angular/core';
import { SpyOf } from '../types/spy-of.type';

// https://itnext.io/better-typescript-support-for-jasmine-20dc7454ba94
export function spyOnClass<T>(spiedClass: Type<T>): SpyOf<T> {
  const prototype = spiedClass.prototype;

  const methods = Object.getOwnPropertyNames(prototype)
    // Object.getOwnPropertyDescriptor is required to filter functions
    .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
    .filter(([_, descriptor]) => {
      // select only functions
      return (descriptor as PropertyDescriptor).value instanceof Function;
    })
    .map(([name]) => name);

  // return spy object
  return jasmine.createSpyObj('spy', [...methods]);
}
