import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@base-components/snack-bar/snack-bar.component';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [SnackBarComponent],
      providers: [SnackbarService, MatSnackBar]
    });

    service = TestBed.inject(SnackbarService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success snack bar', () => {
    spyOn(snackBar, 'openFromComponent');
    service.showSuccess('Success', 'Operation completed');
    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should show error snack bar', () => {
    spyOn(snackBar, 'openFromComponent');
    service.showError('Error', 'Operation failed');
    expect(snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should configure snack bar correctly', () => {
    spyOn(snackBar, 'openFromComponent');
    service.showSnack('Title', 'Message', 'icon', 'panelClass');
    expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackBarComponent, jasmine.any(Object));
  });

  it('should get default config', () => {
    const config = service.getDefaultConfig('Title', 'Message', 'icon');
    expect(config.duration).toBe(5000);
    expect(config.horizontalPosition).toBe('end');
    expect(config.verticalPosition).toBe('top');
    expect(config.data).toEqual({ title: 'Title', message: 'Message', icon: 'icon' });
  });
});
