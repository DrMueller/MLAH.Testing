import { Injectable, Type } from '@angular/core';

import { SpyOf } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SpyFactoryService {
  public static createSpy<T>(spiedClass: Type<T>): SpyOf<T> {
    const functionNames = this.getFunctionNames(spiedClass).map(f => f.propName);
    const spyWithFunctions = jasmine.createSpyObj('spy', [...functionNames]);

    this.getSetters(spiedClass)
      .map(prop => {
        Object.defineProperty(spyWithFunctions, prop.propName, {
          set: function () {
          }
        });
      });

    this.getGetters(spiedClass)
      .map(prop => {
        const spy = jasmine.createSpy(prop.propName);
        Object.defineProperty(spyWithFunctions, prop.propName, {
          get: function () {
            return spy;
          }
        });
      });

    return spyWithFunctions;
  }

  private static getFunctionNames<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
    return this.getObjects(spiedClass)
      .filter(prop => prop.propDescr.value instanceof Function);
  }

  private static getGetters<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
    const result = this.getObjects(spiedClass)
      .filter(prop => prop.propDescr.get)
      .map(prop => {
        return {
          propName: prop.propName,
          propDescr: prop.propDescr,
        };
      });

    return result;
  }

  private static getObjects<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
    const prototype = spiedClass.prototype;
    const result = Object.getOwnPropertyNames(prototype)
      .filter(name => !!Object.getOwnPropertyDescriptor(prototype, name))
      .map(name => {
        return {
          propName: name,
          propDescr: Object.getOwnPropertyDescriptor(prototype, name)!
        };
      });

    return result;
  }

  private static getSetters<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
    const result = this.getObjects(spiedClass)
      .filter(prop => prop.propDescr.set)
      .map(prop => {
        return {
          propName: prop.propName,
          propDescr: prop.propDescr,
        };
      });

    return result;
  }
}
