import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private apiUrl = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

  constructor(private http: HttpClient) { }

  getExchangeRate(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
