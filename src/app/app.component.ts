import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { Subject, filter, takeUntil } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogEditCashFlowComponent } from '@base-components/dialog-edit-cash-flow/dialog-edit-cash-flow.component';
import { SnackbarService } from '@services/snackBar/snackbar.service';
import { dateFilter } from '@base-components/date-filter/date-filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'descricao',
    'valor',
    'tipo',
    'data',
    'Buttons',
  ];
  cashFlow!: CashFlow[];
  filteredCashFlow!: CashFlow[];

  totalEntradasFormatted: string = '';
  totalSaidasFormatted: string = '';
  totalFormatted: string = '';

  constructor(
    private cashFlowService: CashFlowService,
    private dialog: MatDialog,
    private snackBar: SnackbarService
  ) {}

  private readonly unsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.getCashFlow();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCashFlow() {
    this.cashFlowService
      .getCashFlow()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (cashFlow) => {
          this.cashFlow = cashFlow;
          this.filteredCashFlow = cashFlow;
          this.updateValues();
        },
        (_) => {
          this.snackBar.showError(
            'Não foi possível obter os dados.',
            'Tente novamente!'
          );
        }
      );
  }

  updateValues() {
    const totalEntrada = this.filteredCashFlow.reduce((sum, item) => {
      if (item.tipo === 'ENTRADA' && item.valor) {
        sum += item.valor;
      }
      return sum;
    }, 0);

    const totalSaida = this.filteredCashFlow.reduce((sum, item) => {
      if (item.tipo === 'SAIDA' && item.valor) {
        sum += item.valor;
      }
      return sum;
    }, 0);

    const total = totalEntrada - totalSaida;

    this.totalEntradasFormatted = totalEntrada.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    this.totalSaidasFormatted = totalSaida.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    this.totalFormatted = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  edit(cashFlow: CashFlow) {
    this.dialog
      .open(DialogEditCashFlowComponent, {
        width: '70%',
        maxHeight: '95vh',
        panelClass: 'default-dialog',
        closeOnNavigation: true,
        data: {
          cashFlow: cashFlow,
        },
      })
      .afterClosed()
      .pipe(filter((res) => !!res.saved))
      .subscribe(() => this.getCashFlow());
  }

  delete(cashFlow: CashFlow) {
    this.cashFlowService
      .deleteCashFlow(cashFlow.id as string)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res: CashFlow) => {
          this.snackBar.showSuccess('', 'Deletado com sucesso!');
          this.getCashFlow();
        },
        (_) => {
          this.snackBar.showError(
            'Não foi possível deletar.',
            'Tente novamente!'
          );
        }
      );
  }

  onFilter(event: dateFilter): void {
    this.getCashFlowByFilter(event);
  }

  getCashFlowByFilter(dateFilter: dateFilter) {
    // NÃO ESTÁ FUNCIONANDO O FILTRO DIRETO NO JSON-SERVER

    // this.cashFlowService
    //   .getCashFlowByFilter(dateFilter.startDate, dateFilter.endDate)
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe(
    //     (cashFlow) => {
    //       this.cashFlow = cashFlow;
    //       this.updateValues();
    //     },
    //     (_) => {
    //       this.snackBar.showError(
    //         'Não foi possível obter os dados.',
    //         'Tente novamente!'
    //       );
    //     }
    //   );

    const start = this.formatDate(dateFilter.startDate);
    const end = this.formatDate(dateFilter.endDate);

    const filteredData = this.cashFlow.filter((item) => {
      const itemDate = this.formatDate(item.data as Date);
      return itemDate >= start && itemDate <= end;
    });

    this.filteredCashFlow = filteredData;
    this.updateValues();
  }

  formatDate(date: Date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); 
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }
}
