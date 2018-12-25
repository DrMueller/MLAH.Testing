import { ElementFinder, promise } from 'protractor';

export abstract class BaseComponent {
  public constructor(protected elementFinder: ElementFinder) {
  }

  public get isEnabled(): promise.Promise<boolean> {
    return this.elementFinder.getAttribute('disabled').then(attr => {
      return attr === null;
    });
  }

  public get isDiplayed(): promise.Promise<boolean> {
    return this.elementFinder.isDisplayed();
  }
}
