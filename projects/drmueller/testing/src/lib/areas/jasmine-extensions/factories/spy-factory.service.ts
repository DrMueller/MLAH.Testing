import { Type } from '@angular/core';

import { ObjectProperty } from '../models';
import { SpyOf } from '../types';

export class SpyFactoryService {
  public static createSpy<T>(spiedClass: Type<T>): SpyOf<T> {
    const functionNames = this.getFunctionNames(spiedClass).map(f => f.propertyName);

    // Add the functions
    const result = jasmine.createSpyObj('spy', [...functionNames]);

    // Add "empty" setters per setter-property of the spied Class
    this.getSetters(spiedClass)
      .map(prop => {
        Object.defineProperty(result, prop.propertyName, {
          set: function () {
          }
        });
      });

    // Add getters, which return undefined, for each getter-property of the spied Class
    this.getGetters(spiedClass)
      .map(prop => {
        Object.defineProperty(result, prop.propertyName, {
          get: function () {
            return undefined;
          }
        });
      });

    return result;
  }

  private static getFunctionNames<T>(spiedClass: Type<T>): ObjectProperty[] {
    return this.getObjects(spiedClass).filter(prop => prop.propertyDescriptor.value instanceof Function);
  }

  private static getGetters<T>(spiedClass: Type<T>): ObjectProperty[] {
    return this.getObjects(spiedClass).filter(prop => prop.propertyDescriptor.get);
  }

  private static getObjects<T>(spiedClass: Type<T>): ObjectProperty[] {
    const prototype = spiedClass.prototype;
    const result = Object.getOwnPropertyNames(prototype)
      .filter(name => !!Object.getOwnPropertyDescriptor(prototype, name))
      .map(name => new ObjectProperty(name, Object.getOwnPropertyDescriptor(prototype, name)!));

    return result;
  }

  private static getSetters<T>(spiedClass: Type<T>): ObjectProperty[] {
    return this.getObjects(spiedClass).filter(prop => prop.propertyDescriptor.set);
  }
}
