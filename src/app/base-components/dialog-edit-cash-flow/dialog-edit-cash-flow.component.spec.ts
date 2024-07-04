import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCashFlowComponent } from './dialog-edit-cash-flow.component';

describe('DialogEditCashFlowComponent', () => {
  let component: DialogEditCashFlowComponent;
  let fixture: ComponentFixture<DialogEditCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditCashFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
