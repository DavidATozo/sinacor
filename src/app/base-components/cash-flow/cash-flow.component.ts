import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
})
export class CashFlowComponent implements OnInit {
  @Output()
  fnNewCashFlow = new EventEmitter();

  produtoForm!: FormGroup;

  constructor(private cashFlowService: CashFlowService) {}

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      tipo: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    // const produto: any = this.produtoForm.value;
    // Utilize o valor do 'produto' para salvar no banco de dados ou realizar outras ações
    console.log('Produto enviado:', this.produtoForm.value);

    const produto: CashFlow = {
      descricao: this.produtoForm.value.descricao,
      valor: this.produtoForm.value.valor,
      tipo: this.produtoForm.value.tipo.toUpperCase(),
      data: new Date(),
    };
    console.log('Produto enviado2:', produto);

    this.cashFlowService.createCashFlow(produto).subscribe((res) => {
      console.log(res);
      
      this.produtoForm.controls['descricao'].patchValue('');
      this.produtoForm.controls['descricao'].clearValidators();
      this.produtoForm.controls['descricao'].updateValueAndValidity();
      this.produtoForm.controls['valor'].patchValue('');
      this.produtoForm.controls['valor'].clearValidators();
      this.produtoForm.controls['valor'].updateValueAndValidity();
      this.produtoForm.controls['tipo'].patchValue('');
      this.produtoForm.controls['tipo'].clearValidators();
      this.produtoForm.controls['tipo'].updateValueAndValidity();
      this.produtoForm.controls['tipo'].setValidators([Validators.required]);

      this.fnNewCashFlow.emit(true);
      
    });
  }
}
