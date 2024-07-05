import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowComponent } from './cash-flow.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CashFlowComponent', () => {
  let component: CashFlowComponent;
  let fixture: ComponentFixture<CashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      declarations: [
        CashFlowComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
