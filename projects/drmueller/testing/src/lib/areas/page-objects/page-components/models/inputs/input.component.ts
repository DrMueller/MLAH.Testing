import { BaseComponent } from '../base';
import { ElementFinder, promise } from 'protractor';

export class InputComponent extends BaseComponent {
  public constructor(elementFinder: ElementFinder) {
    super(elementFinder);
  }

  public setText(value: string | number): promise.Promise<void> {
    return this.elementFinder.sendKeys(...[value]);
  }

  public get text(): promise.Promise<string> {
    return this.elementFinder.getText();
  }
}
