import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { SnackbarService } from '@services/snackBar/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

export interface DialogEditCashFlowData {
  cashFlow: CashFlow;
}

@Component({
  selector: 'app-dialog-edit-cash-flow',
  templateUrl: './dialog-edit-cash-flow.component.html',
  styleUrls: ['./dialog-edit-cash-flow.component.scss'],
})
export class DialogEditCashFlowComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  produtoForm!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogEditCashFlowData,
    private dialogRef: MatDialogRef<DialogEditCashFlowComponent>,
    private cashFlowService: CashFlowService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log('this.data.cashFlow: ', this.data?.cashFlow);
    this.produtoForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      tipo: new FormControl('', [Validators.required]),
    });

    this.produtoForm.controls['descricao'].patchValue(
      this.data.cashFlow?.descricao
    );
    this.produtoForm.controls['valor'].patchValue(this.data.cashFlow?.valor);
    if (this.data.cashFlow?.tipo === 'ENTRADA') {
      this.produtoForm.controls['tipo'].patchValue('Entrada');
    } else {
      if (this.data.cashFlow?.tipo === 'SAIDA') {
        this.produtoForm.controls['tipo'].patchValue('Saida');
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  edit() {
    const produto: CashFlow = {
      id: this.data.cashFlow.id,
      descricao: this.produtoForm.value.descricao,
      valor: this.produtoForm.value.valor,
      tipo: this.produtoForm.value.tipo.toUpperCase(),
      data: new Date(),
    };

    this.cashFlowService
      .editCashFlow(produto)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((_) => {
        this.snackBar.showSuccess('', 'Editado com sucesso!');
        this.dialogRef.close({ saved: true });
      },
      (_) => {
        this.snackBar.showError(
          'Não foi possível editar.',
          'Tente novamente!'
        );
      }
    );
  }
}
