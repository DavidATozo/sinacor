import { Component, OnDestroy, OnInit } from '@angular/core';

import { ExchangeRateService } from '@services/exchange-rate/exchange-rate.service';
import { SnackbarService } from '@services/snackBar/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  exchangeRate: any;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.exchangeRateService
      .getExchangeRate()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.exchangeRate = data.USDBRL;
      },
      (_) => {
        this.snackBar.showError(
          '',
          'Não foi possível obter a cotação do dolar.'
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
