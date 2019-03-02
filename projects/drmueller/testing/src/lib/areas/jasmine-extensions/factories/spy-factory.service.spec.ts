import { inject, TestBed } from '@angular/core/testing';
import { Individual } from 'src/app/models';

import { SpyOf } from '../types/spy-of.type';

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
        spyOnProperty(individualSpy, 'lastName', 'get').and.returnValue(lastName);
      });

      // Incoming Event
      describe('When the getter is called', () => {
        let actualLastName: any;

        beforeEach(() => {
          actualLastName = individualSpy.lastName;
        });

        it('Then the getter value is returned', () => {
          expect(actualLastName).toEqual(lastName);
        });
      });
    });

    // Scenario
    describe('Given a spy on a setter is set', () => {
      let firstNameSetterSpy: jasmine.Spy;

      beforeEach(() => {
        firstNameSetterSpy = spyOnProperty(individualSpy, 'firstName', 'set');
      });

      // Incoming Event
      describe('When the setter is called', () => {
        beforeEach(() => {
          (<any>individualSpy).firstName = 'Hello';
        });

        it('Then the setter has been called', () => {
          expect(firstNameSetterSpy).toHaveBeenCalled();
        });
      });
    });

    // Scenario
    describe('Given a method spy return value is set', () => {
      const fullName = 'Matthias Müller';

      beforeEach(() => {
        individualSpy.createFullName.and.returnValue(fullName);
      });

      // Incoming Event
      describe('When the method is called', () => {
        let actualFullName: string;

        beforeEach(() => {
          actualFullName = individualSpy.createFullName();
        });

        it('Then the set value is returned', () => {
          expect(actualFullName).toEqual(fullName);
        });
      });

    });
  });
});
