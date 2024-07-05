import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface SnackBarData {
  title?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  porcentage: number = 0;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {}

  ngOnInit(): void {
    const myInterval = setInterval(() => {
      this.porcentage += 1;
      if (this.porcentage == 100) {
        clearInterval(myInterval);
      }
    }, 50);
  }
}
