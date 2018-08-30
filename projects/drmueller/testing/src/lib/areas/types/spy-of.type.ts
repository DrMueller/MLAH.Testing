export type SpyOf<T> = {
  [Method in keyof T]: jasmine.Spy;
};
