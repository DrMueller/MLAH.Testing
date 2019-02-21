import { Type } from '@angular/core';

import { SpyOf } from '../types';

export class SpyFactoryService {
  public static createSpy<T>(spiedClass: Type<T>): SpyOf<T> {
    const functionNames = this.getFunctionNames(spiedClass).map(f => f.propName);

    // Add the functions
    const result = jasmine.createSpyObj('spy', [...functionNames]);

    // Add "empty" setters per setter property of the spied Class
    this.getSetters(spiedClass)
      .map(prop => {
        Object.defineProperty(result, prop.propName, {
          set: function () {
          }
        });
      });

    // Add getters, which return undefined, for each getter property of the spied Class
    this.getGetters(spiedClass)
      .map(prop => {
        Object.defineProperty(result, prop.propName, {
          get: function () {
            return undefined;
          }
        });
      });

    return result;
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
