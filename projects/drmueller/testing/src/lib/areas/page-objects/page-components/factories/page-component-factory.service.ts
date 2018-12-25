import { by, element, ElementFinder } from 'protractor';

import { ICreatablableComponent } from '../models/base';

export class PageComponentFactoryService {
  public static createByTestingAttribute<T>(ctor: ICreatablableComponent<T>, attributeName: string): T {
    const elementFinder = element(by.css(`[uitesting=${attributeName}]`));
    return this.create<T>(ctor, elementFinder);
  }

  private static create<T>(ctor: ICreatablableComponent<T>, elementFinder: ElementFinder): T {
    return new ctor(elementFinder);
  }
}
