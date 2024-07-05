import { TestBed } from '@angular/core/testing';
import { CashFlowService } from './cash-flow.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CashFlow } from './cash-flow.model';
import { environment } from 'src/environments/environment';

describe('CashFlowService', () => {
  let service: CashFlowService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CashFlowService]
    });

    service = TestBed.inject(CashFlowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve cash flows from API', () => {
    const mockCashFlows: CashFlow[] = [
      { id: '1', descricao: 'Salary', valor: 5000, tipo: 'ENTRADA', data: '2024-07-05' },
      { id: '2', descricao: 'Rent', valor: -1200, tipo: 'SAIDA', data: '2024-07-05' }
    ];

    service.getCashFlow().subscribe(cashFlows => {
      expect(cashFlows.length).toBe(2);
      expect(cashFlows).toEqual(mockCashFlows);
    });

    const req = httpMock.expectOne(`${environment.API}/cashflow`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCashFlows);
  });

  it('should create a cash flow entry via API', () => {
    const newCashFlow: CashFlow = { descricao: 'Bonus', valor: 1000, tipo: 'ENTRADA', data: '2024-07-06' };

    service.createCashFlow(newCashFlow).subscribe(cashFlow => {
      expect(cashFlow).toEqual(newCashFlow);
    });

    const req = httpMock.expectOne(`${environment.API}/cashflow`);
    expect(req.request.method).toBe('POST');
    req.flush(newCashFlow);
  });

  it('should update a cash flow entry via API', () => {
    const updatedCashFlow: CashFlow = { id: '1', descricao: 'Bonus', valor: 1200, tipo: 'ENTRADA', data: '2024-07-06' };

    service.editCashFlow(updatedCashFlow).subscribe(cashFlow => {
      expect(cashFlow).toEqual(updatedCashFlow);
    });

    const req = httpMock.expectOne(`${environment.API}/cashflow/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedCashFlow);
  });

  it('should delete a cash flow entry via API', () => {
    const idToDelete = '1';

    service.deleteCashFlow(idToDelete).subscribe(cashFlow => {
      expect(cashFlow).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.API}/cashflow/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
