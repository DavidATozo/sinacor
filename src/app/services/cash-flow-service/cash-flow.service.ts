import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CashFlow } from './cash-flow.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashFlowService {
  private readonly API = `${environment.API}/cashflow`;

  constructor(private http: HttpClient) {}

  getCashFlow(): Observable<CashFlow[]> {
    return this.http.get<CashFlow[]>(this.API);
  }

  getCashFlowByFilter(startDate: Date, endDate: Date): Observable<CashFlow[]> {
    let params = new HttpParams();
    params = params.set('data_gte', startDate.toISOString());
    params = params.set('data_lte', endDate.toISOString());

    return this.http.get<CashFlow[]>(this.API, { params });
  }

  createCashFlow(cashflow: CashFlow): Observable<CashFlow> {
    return this.http.post(this.API, cashflow);
  }

  editCashFlow(cashflow: CashFlow): Observable<CashFlow> {
    return this.http.patch(`${this.API}/${cashflow.id}`, cashflow);
  }

  deleteCashFlow(id: string): Observable<CashFlow> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
