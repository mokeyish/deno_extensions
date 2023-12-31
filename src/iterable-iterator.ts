// deno-lint-ignore-file no-this-alias no-explicit-any
declare global {

  interface IterableIterator<T> {
    skipLast(count: number): IterableIterator<T>;
  
    skip(count: number): IterableIterator<T>;
  
    skipWhile(predicate: (item: T, index: number) => boolean): IterableIterator<T>;
  
    take(count: number): IterableIterator<T>;
  
    takeLast(count: number): IterableIterator<T>;
  
    takeWhile(predicate: (item: T, index: number) => boolean): IterableIterator<T>;
  
    find(predicate: (item: T, index: number) => boolean): T | undefined;
  
    sequenceEqual(other: IterableIterator<T>): boolean;
  
    toArray(): T[];
  }
  
}

const iterableIterator : IterableIterator<any> = { } as any;

iterableIterator.skip = function (count: number): IterableIterator<any> {
  while (count > 0) {
      const n = this.next();
      if (n.done) {
          break;
      }
      count--;
  }
  return this;
}

iterableIterator.skipWhile = function (predicate: (item: any, index: number) => boolean): IterableIterator<any> {
  let  i = 0;
  while (true) {
      const n = this.next();
      if (n.done) {
          break;
      }
      if (predicate(n.value, i)) {
          break;
      }
      i++;
  }
  return this;
}

iterableIterator.take = function(count: number): IterableIterator<any> {
  const v = [];
  let next = this.next();
  while (count > 0 && !next.done) {
      v.push(next.value);
      next = this.next();
      count-- ;
  }
  return v.values();
}

iterableIterator.takeWhile = function(predicate: (item: any, index: number) => boolean): IterableIterator<any> {
  const v = [];
  let next = this.next();
  let i = 0;
  while (!next.done) {
      v.push(next.value);
      next = this.next();
      if (predicate(next.value, i)) {
          v.push(next.value);
          break;
      }
      i++;
  }
  return v.values();
}

iterableIterator.find = function(predicate: (item: any, index: number) => boolean): any | undefined {
  let next = this.next();
  let i = 0;
  while (!next.done) {
      next = this.next();
      if (predicate(next.value, i)) {
          return next.value;
      }
      i++;
  }
}

iterableIterator.toArray = function (): any[] {
  const v = [];
  let next = this.next();
  while (!next.done) {
      v.push(next.value);
      next = this.next();
  }
  return v;
}

iterableIterator.sequenceEqual = function(other: IterableIterator<any>): boolean {
  const a = this;
  const b = other;
  while (true) {
      const m = a.next();
      const n = b.next();
      if (m.done !== n.done || m.value !== n.value) {
          return false;
      }
      if (m.done) {
          break;
      }
  }
  return true;
}

Object.assign(Object.getPrototypeOf([].values()), iterableIterator);
Object.assign(Object.getPrototypeOf(new Map().keys()), iterableIterator);