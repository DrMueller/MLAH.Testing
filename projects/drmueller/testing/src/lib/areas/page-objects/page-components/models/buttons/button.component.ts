import { ElementFinder, promise } from 'protractor';

import { BaseComponent } from '../base';

export class ButtonComponent extends BaseComponent {
  public constructor(elementFinder: ElementFinder) {
    super(elementFinder);
  }

  public click(): promise.Promise<void> {
    return this.elementFinder.click();
  }
}
