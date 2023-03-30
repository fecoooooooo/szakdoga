import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToHun',
})
export class BooleanToHunPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === true) {
      return 'igen';
    } else if (value === false) {
      return 'nem';
    }

    return null;
  }
}
