import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { Subject, takeUntil } from 'rxjs';

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
  datasource!: CashFlow[];

  totalEntradasFormatted: string = '';
  totalSaidasFormatted: string = '';
  totalFormatted: string = '';

  constructor(private cashFlowService: CashFlowService) {}

  private readonly unsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.getCashFlow();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getCashFlow() {
    this.cashFlowService.getCashFlow()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((cashFlow) => {
      this.datasource = cashFlow;
      this.updateValues();
    });
  }

  updateValues() {
    const totalEntrada = this.datasource.reduce((sum, item) => {
      if (item.tipo === 'ENTRADA' && item.valor) {
        sum += item.valor;
      }
      return sum;
    }, 0);

    const totalSaida = this.datasource.reduce((sum, item) => {
      if (item.tipo === 'SAIDA' && item.valor) {
        sum += item.valor;
      }
      return sum;
    }, 0);

    const total = totalEntrada - totalSaida;

    this.totalEntradasFormatted = totalEntrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    this.totalSaidasFormatted = totalSaida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    this.totalFormatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  edit(cashFlow: CashFlow) {
    console.log('cashFlow: ', cashFlow);
    this.cashFlowService.editCashFlow(cashFlow).subscribe((res: CashFlow) => {
      console.log('res:', res);
      this.getCashFlow();
    });
  }

  delete(cashFlow: CashFlow) {
    console.log('cashFlow: ', cashFlow);
    this.cashFlowService
      .deleteCashFlow(cashFlow.id as string)
      .subscribe((res: CashFlow) => {
        console.log('res:', res);
        this.getCashFlow();
      });
  }
}
