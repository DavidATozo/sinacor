import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  template: `<ng-content></ng-content>`
})
export class CellComponent {
  @Input() col = 1; //Max 12 columns
  @Input() colTablet = 0; //Max 8 columns
  @Input() colPhone = 0; //Max 4 columns
  @Input() verticalAlign!: string; // "top" || "middle" || "bottom" || "stretch";
  @Input() hideInDevices: string[] = []; // ["desktop", "tablet", "phone"];

  @Input() class = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'mdl-cell',
      this.class,
      this.getCol(),
      this.getColTablet(),
      this.getColPhone(),
      this.getAlignment(),
      this.getDevices()
    ].join(' ');
  }

  getCol(): string {
    return `mdl-cell--${this.col}-col`;
  }

  getColTablet(): string {
    return this.colTablet > 0 ? `mdl-cell--${this.colTablet}-col-tablet` : '';
  }

  getColPhone(): string {
    return this.colPhone > 0 ? `mdl-cell--${this.colPhone}-col-phone` : '';
  }

  getAlignment(): string {
    return this.verticalAlign ? `mdl-cell--${this.verticalAlign}` : '';
  }

  getDevices(): string {
    if (this.hideInDevices.length < 1) return '';

    const devices: string[] = [];

    this.hideInDevices.forEach((device) => {
      devices.push(`mdl-cell--hide-${device}`);
    });

    return devices.join(' ');
  }
}
