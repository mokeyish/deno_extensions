
declare global {
  interface String {
    trimEnd(): string,
    /**
     * Removes all the trailing occurrences of a character from the current string. 
     * @param chars characters to remove
     */
    trimEnd(chars: string): string,
    trimEnd(chars?: string): string,


    trimStart(): string,    
    /**
    * Removes all the leading occurrences of a character from the current string. 
    * @param chars characters to remove
    */
    trimStart(chars: string): string,
    trimStart(chars?: string): string,


    trim(): string,
    trim(chars: string): string,
    trim(chars?: string): string,
  }
}

const origin = {
  trimEnd: String.prototype.trimEnd,
  trimStart: String.prototype.trimStart,
  trim: String.prototype.trim,
}

String.prototype.trimEnd = function (chars?: string) {
  if (chars && this.length > 0) {
    let i = this.length - 1;
    while (true) {
      const c = this[i];
      if (chars.includes(c)) {
        i -= 1;
      } else {
        break;
      }
    }
    return this.substring(0, i + 1);
  } else {
    return origin.trimEnd.call(this);
  }
}

String.prototype.trimStart = function (chars?: string) {
  if (chars && this.length > 0) {
    let i = 0;
    while (true) {
      const c = this[i];
      if (chars.includes(c)) {
        i += 1;
      } else {
        break
      }
    }
    return this.substring(i);
  } else {
    return origin.trimStart.call(this);
  }
}

String.prototype.trim = function (chars?: string) {
  if (chars && this.length > 0) {
    return this.trimStart(chars).trimEnd(chars);
  } else {
    return origin.trim.call(this);
  }
}
