import { inject, TestBed } from '@angular/core/testing';

import { SpyOf } from '../types';

import { Individual } from '.';
import { SpyFactoryService } from './spy-factory.service';

describe('SpyFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpyFactoryService]
    });
  });

  it('should be created', inject([SpyFactoryService], (service: SpyFactoryService) => {
    expect(service).toBeTruthy();
  }));

  // Feature
  describe('Creating a spy', () => {
    let individualSpy: SpyOf<Individual>;

    beforeEach(() => {
      individualSpy = SpyFactoryService.createSpy(Individual);
    });

    // Scenario
    describe('Given return value from a getter is set', () => {
      const lastName = 'Matthias';

      beforeEach(() => {
        individualSpy.lastName.and.returnValue(lastName);
      });

      // Incoming Event
      describe('When the getter is called', () => {
        let actualLastName: any;

        beforeEach(() => {
          actualLastName = individualSpy.lastName();
        });

        it('Then the getter value is returned', () => {
          expect(actualLastName).toEqual(lastName);
        });
      });
    });
  });
});
