import { spyOnClass } from './spy-on-class.function';
import { Type } from '@angular/core';

export function provideMock<T>(spiedClass: Type<T>) {
  return {
    provide: spiedClass,
    useValue: spyOnClass(spiedClass)
  };
}
