import { Type } from '@angular/core';

import { SpyOf } from '../types/spy-of.type';

import { SpyFactoryService } from './spy-factory.service';

export class MockProviderService {
  public static provideMock<T>(spiedClass: Type<T>) {
    return {
      provide: spiedClass,
      useValue: SpyFactoryService.createSpy(spiedClass)
    };
  }

  public static provideMockInstance<T>(spiedClass: Type<T>, mockInstance: SpyOf<T>) {
    return {
      provide: spiedClass,
      useValue: mockInstance
    };
  }
}
