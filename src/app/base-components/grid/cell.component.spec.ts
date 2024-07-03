import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve obter a class com 8 colunas', () => {
    component.col = 8;
    fixture.detectChanges();
    expect(component.getCol()).toEqual('mdl-cell--8-col')
  });

  it('não deve obter a class com colunas para Tablet', () => {
    expect(component.getColTablet()).toEqual('')
  });

  it('deve obter a class com 8 colunas para Tablet', () => {
    component.colTablet = 8;
    fixture.detectChanges();
    expect(component.getColTablet()).toEqual('mdl-cell--8-col-tablet')
  });

  it('não deve obter a class com colunas para Phone', () => {
    expect(component.getColPhone()).toEqual('')
  });

  it('deve obter a class com 8 colunas para Phone', () => {
    component.colPhone = 8;
    fixture.detectChanges();
    expect(component.getColPhone()).toEqual('mdl-cell--8-col-phone')
  });

});
