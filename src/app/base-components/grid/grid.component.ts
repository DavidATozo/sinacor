import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  template: `<ng-content></ng-content>`
})
export class GridComponent {
  @Input() noSpacing = false;
  @Input() justifyContent!: string; // "left" || "center" || "right" || "space-around" || "space-between" || "space-evenly" || "stretch";

  @Input() class = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'mdl-grid',
      this.class,
      this.getSpacing(),
      this.getJustifyContent()
    ].join(' ');
  }

  getSpacing() {
    return this.noSpacing ? 'mdl-grid--no-spacing' : '';
  }

  getJustifyContent() {
    return this.justifyContent ? `mdl-grid--${this.justifyContent}` : '';
  }
}
