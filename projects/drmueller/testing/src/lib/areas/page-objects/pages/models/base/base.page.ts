import { browser, promise } from 'protractor';

export abstract class BasePage {
  protected checkIfIsDisplayed(url: string): promise.Promise<boolean> {
    return browser.getCurrentUrl().then(value => {
      return value.endsWith(url);
    });
  }

  protected navigateTo(relativePath: string): promise.Promise<any> {
    return browser.get(relativePath);
  }
}
