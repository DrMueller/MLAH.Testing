export class Individual {
  private _lastName: string;

  public get lastName(): string {
    return this._lastName;
  }

  public createFullName(): string {
    return ' ' + this.lastName;
  }
}
