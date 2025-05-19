import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyHuf',
  standalone: true
})
export class CurrencyHufPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') value = parseFloat(value);
    if (isNaN(value)) return '';
    return value.toLocaleString('hu-HU') + ' Ft';
  }
}
