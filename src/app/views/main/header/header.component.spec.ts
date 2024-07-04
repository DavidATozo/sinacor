import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '@services/snackBar/snackbar.service';
import { ExchangeRateService } from '@services/exchange-rate/exchange-rate.service';
import { of, throwError } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let exchangeRateService: jasmine.SpyObj<ExchangeRateService>;
  let snackBarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getExchangeRate']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackbarService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: SnackbarService, useValue: snackBarServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    exchangeRateService = TestBed.inject(ExchangeRateService) as jasmine.SpyObj<ExchangeRateService>;
    snackBarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exchange rate on init', () => {
    const exchangeRateData = { USDBRL: { bid: '5.30' } };
    exchangeRateService.getExchangeRate.and.returnValue(of(exchangeRateData));

    fixture.detectChanges(); 

    expect(component.exchangeRate).toEqual(exchangeRateData.USDBRL);
  });

  it('should handle error when getting exchange rate', () => {
    exchangeRateService.getExchangeRate.and.returnValue(throwError(() => new Error('error')));

    fixture.detectChanges(); 

    expect(snackBarService.showError).toHaveBeenCalledWith(
      '',
      'Não foi possível obter a cotação do dolar.'
    );
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['unsubscribe'], 'next');
    spyOn(component['unsubscribe'], 'complete');

    component.ngOnDestroy();

    expect(component['unsubscribe'].next).toHaveBeenCalled();
    expect(component['unsubscribe'].complete).toHaveBeenCalled();
  });

});
