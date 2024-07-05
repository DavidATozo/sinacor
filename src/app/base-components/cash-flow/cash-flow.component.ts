import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    private fb: FormBuilder,
    private cashFlowService: CashFlowService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      descricao: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      tipo: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(): void {
    // this.markFormGroupTouched(this.produtoForm);
    this.produtoForm.updateValueAndValidity();
    this.produtoForm.markAsTouched();
    if (this.produtoForm.value.descricao && this.produtoForm.value.valor && this.produtoForm.value.tipo) {
      const produto: CashFlow = {
        descricao: this.produtoForm.value.descricao,
        valor: this.produtoForm.value.valor,
        tipo: this.produtoForm.value.tipo.toUpperCase(),
        data: new Date(),
      };

      this.cashFlowService
        .createCashFlow(produto)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          (_) => {
            this.produtoForm.controls['descricao'].clearValidators();
            this.produtoForm.controls['valor'].clearValidators();
            this.produtoForm.controls['tipo'].clearValidators();
            this.produtoForm.reset();

            console.log('for: ', this.produtoForm)

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
    } else {
      this.snackBar.showError(
        'Campos obrigatórios!',
        'Preencha todos os campos obrigatórios.'
      );
    }
  }
}
