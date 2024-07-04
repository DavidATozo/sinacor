import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { SnackBarComponent, SnackBarData } from '@base-components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(title: string, message: string) {
    this.showSnack(title, message, 'check', 'success');
  }

  showError(title: string, message: string) {
    this.showSnack(title, message, 'error', 'error');
  }

  showSnack(
    title: string,
    message: string,
    icon?: string,
    panelClass?: string
  ) {
    const config = this.getDefaultConfig(title, message, icon);
    if (panelClass) {
      (config.panelClass as string[]).push(panelClass);
    }

    this.snackBar.openFromComponent(SnackBarComponent, config);
  }

  getDefaultConfig(
    title: string,
    message: string,
    icon?: string
  ): MatSnackBarConfig<SnackBarData> {
    const config = new MatSnackBarConfig<SnackBarData>();
    config.panelClass = ['ass-snack'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    config.data = {
      title,
      message,
      icon
    };
    return config;
  }
}
