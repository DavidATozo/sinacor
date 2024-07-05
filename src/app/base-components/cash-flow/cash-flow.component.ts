import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '@services/snackBar/snackbar.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
})
export class CashFlowComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();
  
  @Output()
  fnNewCashFlow = new EventEmitter();

  produtoForm!: FormGroup;

  constructor(
    private cashFlowService: CashFlowService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      tipo: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(): void {

    const produto: CashFlow = {
      descricao: this.produtoForm.value.descricao,
      valor: this.produtoForm.value.valor,
      tipo: this.produtoForm.value.tipo.toUpperCase(),
      data: new Date(),
    };

    this.cashFlowService.createCashFlow(produto)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((res) => {
      this.produtoForm.controls['descricao'].patchValue('');
      this.produtoForm.controls['descricao'].clearValidators();
      this.produtoForm.controls['descricao'].updateValueAndValidity();
      this.produtoForm.controls['valor'].patchValue('');
      this.produtoForm.controls['valor'].clearValidators();
      this.produtoForm.controls['valor'].updateValueAndValidity();
      this.produtoForm.controls['tipo'].patchValue('');
      this.produtoForm.controls['tipo'].clearValidators();
      this.produtoForm.controls['tipo'].updateValueAndValidity();

      this.snackBar.showSuccess('', 'Adicionado com sucesso!');
      this.fnNewCashFlow.emit(true);      
    },
    (_) => {
      this.snackBar.showError(
        'Não foi possível adicionar.',
        'Tente novamente!'
      );
    }
  );
  }
}
