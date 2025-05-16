import {RandomUtils} from 'co2m.js';

type zConstructor<T = {}> = new (...args: any[]) => T;

export function FormA11yMixin<TBase extends zConstructor>(Base: TBase) {
  return class extends Base {
    inputId = RandomUtils.secureChars(8); // ou injecter UUID
    helperId = `${this.inputId}-help`;
    // errorId = `${this.inputId}-error`;

    helperText?: string;
    errorMessage?: string;

    hasError(): boolean {
      // Ajoute cette.control si tu as accès à un AbstractControl
      // return !!(this.control?.invalid && this.control?.touched);
      return false;
    }

    getDescribedBy(): string | null {
      const ids = [];
      if (this.helperText) ids.push(this.helperId);
      //if (this.hasError()) ids.push(this.errorId);
      return ids.length ? ids.join(' ') : null;
    }
  };
}
