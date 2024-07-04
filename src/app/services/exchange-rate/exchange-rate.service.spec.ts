import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRateService]
    });
    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar a cotação do dólar', () => {
    const dummyResponse = {
      USDBRL: {
        bid: 5.25
      }
    };

    service.getExchangeRate().subscribe((response) => {
      expect(response.USDBRL.bid).toBe(5.25);
    });

    const req = httpMock.expectOne('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('deve lidar com erro ao obter a cotação', () => {
    service.getExchangeRate().subscribe(
      () => fail('deveria falhar com um erro 500'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    expect(req.request.method).toBe('GET');
    req.flush('Erro no servidor', { status: 500, statusText: 'Server Error' });
  });
});
