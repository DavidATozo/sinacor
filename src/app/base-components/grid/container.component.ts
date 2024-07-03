import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `<ng-content></ng-content>`,
})
export class ContainerComponent {

  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'mdl-container',
      this.class,
      ,
    ].join(' ');
  }

}
