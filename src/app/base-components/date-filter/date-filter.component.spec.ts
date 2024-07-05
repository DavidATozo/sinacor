import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterComponent } from './date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFilterComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.range).toBeDefined();
    expect(component.range.controls['start']).toBeDefined();
    expect(component.range.controls['end']).toBeDefined();
  });

  it('should emit onFilter event when date range is selected', () => {
    spyOn(component.onFilter, 'emit');

    const startDate = new Date(2021, 1, 1);
    const endDate = new Date(2021, 1, 10);

    component.range.setValue({ start: startDate, end: endDate });

    expect(component.onFilter.emit).toHaveBeenCalledWith({
      startDate: startDate,
      endDate: endDate
    });
  });

  it('should not emit onFilter event when date range is incomplete', () => {
    spyOn(component.onFilter, 'emit');

    const startDate = new Date(2021, 1, 1);

    component.range.setValue({ start: startDate, end: null });

    expect(component.onFilter.emit).not.toHaveBeenCalled();
  });

  it('should set maxDate to current date', () => {
    const today = new Date();
    const maxDate = component.maxDate;

    expect(maxDate.getFullYear()).toEqual(today.getFullYear());
    expect(maxDate.getMonth()).toEqual(today.getMonth());
    expect(maxDate.getDate()).toEqual(today.getDate());
  });
});
