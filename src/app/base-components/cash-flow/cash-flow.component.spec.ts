import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowComponent } from './cash-flow.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { SnackbarService } from '@services/snackBar/snackbar.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CashFlowComponent', () => {
  let component: CashFlowComponent;
  let fixture: ComponentFixture<CashFlowComponent>;
  let cashFlowService: jasmine.SpyObj<CashFlowService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const cashFlowServiceSpy = jasmine.createSpyObj('CashFlowService', ['createCashFlow']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      declarations: [CashFlowComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule 
      ],
      providers: [
        FormBuilder,
        { provide: CashFlowService, useValue: cashFlowServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy }
      ]
    })
    .compileComponents();

    cashFlowService = TestBed.inject(CashFlowService) as jasmine.SpyObj<CashFlowService>;
    snackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.produtoForm).toBeDefined();
    expect(component.produtoForm.controls['descricao']).toBeDefined();
    expect(component.produtoForm.controls['valor']).toBeDefined();
    expect(component.produtoForm.controls['tipo']).toBeDefined();
  });

  it('should show error if form is invalid on submit', () => {
    component.produtoForm.controls['descricao'].setValue(null);
    component.produtoForm.controls['valor'].setValue(null);
    component.produtoForm.controls['tipo'].setValue(null);

    component.onSubmit();

    expect(snackbarService.showError).toHaveBeenCalledWith(
      'Campos obrigatórios!',
      'Preencha todos os campos obrigatórios.'
    );
  });

  it('should reset the form and show success message on successful submission', () => {
    component.produtoForm.controls['descricao'].setValue('Test Description');
    component.produtoForm.controls['valor'].setValue(100);
    component.produtoForm.controls['tipo'].setValue('entrada');

    cashFlowService.createCashFlow.and.returnValue(of({}));

    component.onSubmit();

    expect(cashFlowService.createCashFlow).toHaveBeenCalled();
    expect(snackbarService.showSuccess).toHaveBeenCalledWith('', 'Adicionado com sucesso!');
    expect(component.produtoForm.controls['descricao'].value).toBe(null);
    expect(component.produtoForm.controls['valor'].value).toBe(null);
    expect(component.produtoForm.controls['tipo'].value).toBe(null);
  });

  it('should show error message on failed submission', () => {
    component.produtoForm.controls['descricao'].setValue('Test Description');
    component.produtoForm.controls['valor'].setValue(100);
    component.produtoForm.controls['tipo'].setValue('entrada');

    cashFlowService.createCashFlow.and.returnValue(throwError('Error'));

    component.onSubmit();

    expect(cashFlowService.createCashFlow).toHaveBeenCalled();
    expect(snackbarService.showError).toHaveBeenCalledWith(
      'Não foi possível adicionar.',
      'Tente novamente!'
    );
  });
});