import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCashFlowComponent } from './dialog-edit-cash-flow.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogEditCashFlowComponent', () => {
  let component: DialogEditCashFlowComponent;
  let fixture: ComponentFixture<DialogEditCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      declarations: [
        DialogEditCashFlowComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: {} } 
      ]
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
