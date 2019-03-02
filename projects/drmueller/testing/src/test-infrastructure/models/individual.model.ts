export class Individual {
  private _lastName: string;
  private _firstName: string;

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public createFullName(): string {
    return this._firstName + ' ' + this.lastName;
  }
}
