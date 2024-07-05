import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CashFlowService } from '@services/cash-flow-service/cash-flow.service';
import { CashFlow } from '@services/cash-flow-service/cash-flow.model';
import { of, throwError } from 'rxjs';
import { DialogEditCashFlowComponent } from '@base-components/dialog-edit-cash-flow/dialog-edit-cash-flow.component';
import { SnackbarService } from '@services/snackBar/snackbar.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cashFlowService: jasmine.SpyObj<CashFlowService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    const cashFlowServiceSpy = jasmine.createSpyObj('CashFlowService', ['getCashFlow', 'deleteCashFlow']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarSpy = jasmine.createSpyObj('SnackbarService', ['showError', 'showSuccess']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: CashFlowService, useValue: cashFlowServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: SnackbarService, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    cashFlowService = TestBed.inject(CashFlowService) as jasmine.SpyObj<CashFlowService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getCashFlow', () => {
      spyOn(component, 'getCashFlow');
      component.ngOnInit();
      expect(component.getCashFlow).toHaveBeenCalled();
    });
  });

  describe('getCashFlow', () => {
    it('should set filteredCashFlow on success', () => {
      const mockCashFlow: CashFlow[] = [{ id: '1', descricao: 'Teste', valor: 100, tipo: 'ENTRADA', data: '2024-07-04' }];
      cashFlowService.getCashFlow.and.returnValue(of(mockCashFlow));

      component.getCashFlow();

      expect(component.filteredCashFlow).toEqual(mockCashFlow);
    });

    it('should show error message on failure', () => {
      cashFlowService.getCashFlow.and.returnValue(throwError('error'));

      component.getCashFlow();

      expect(snackBar.showError).toHaveBeenCalledWith('Não foi possível obter os dados.', 'Tente novamente!');
    });
  });

  describe('edit', () => {
    it('should open edit dialog and refresh cash flows on save', () => {
      const mockCashFlow: CashFlow = { id: '1', descricao: 'Teste', valor: 100, tipo: 'ENTRADA', data: '2024-07-04' };
      const dialogRef = { afterClosed: () => of({ saved: true }) } as any;
      dialog.open.and.returnValue(dialogRef);

      spyOn(component, 'getCashFlow');
      component.edit(mockCashFlow);

      expect(dialog.open).toHaveBeenCalledWith(DialogEditCashFlowComponent, {
        width: '70%',
        maxHeight: '95vh',
        panelClass: 'default-dialog',
        closeOnNavigation: true,
        data: { cashFlow: mockCashFlow }
      });

      expect(component.getCashFlow).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should show success message and refresh cash flows on delete success', () => {
      const mockCashFlow: CashFlow = { id: '1', descricao: 'Teste', valor: 100, tipo: 'ENTRADA', data: '2024-07-04' };
      cashFlowService.deleteCashFlow.and.returnValue(of(mockCashFlow));

      spyOn(component, 'getCashFlow');
      component.delete(mockCashFlow);

      expect(snackBar.showSuccess).toHaveBeenCalledWith('', 'Deletado com sucesso!');
      expect(component.getCashFlow).toHaveBeenCalled();
    });

    it('should show error message on delete failure', () => {
      const mockCashFlow: CashFlow = { id: '1', descricao: 'Teste', valor: 100, tipo: 'ENTRADA', data: '2024-07-04' };
      cashFlowService.deleteCashFlow.and.returnValue(throwError('error'));

      component.delete(mockCashFlow);

      expect(snackBar.showError).toHaveBeenCalledWith('Não foi possível deletar.', 'Tente novamente!');
    });
  });
});
