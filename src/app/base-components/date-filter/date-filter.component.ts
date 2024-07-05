import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface dateFilter {
  startDate: Date,
  endDate: Date
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  @Output() onFilter: EventEmitter<dateFilter> = new EventEmitter();

  readonly maxDate = new Date();

  periodSelect: dateFilter = {
    startDate: new Date,
    endDate: new Date
  };

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() { }

  ngOnInit(): void {
    this.watchRangeChanges();
  }

  watchRangeChanges(): void {
    this.range.valueChanges.subscribe((range) => {
      if (range.start && range.end) {
        this.periodSelect = {
          endDate: range.end,
          startDate: range.start
        };

        this.onFilter.emit(this.periodSelect);
      }
    });
  }
}
