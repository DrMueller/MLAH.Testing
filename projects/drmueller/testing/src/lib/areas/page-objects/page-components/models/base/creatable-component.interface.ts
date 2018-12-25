import { ElementFinder } from 'protractor';

export interface ICreatablableComponent<T> {
  new(elementFinder: ElementFinder): T;
}
