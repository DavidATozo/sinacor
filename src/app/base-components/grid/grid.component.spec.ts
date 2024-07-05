import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('não deve obter a class sem espaçamento', () => {
    expect(component.getSpacing()).toEqual('')
  })

  it('deve obter a class sem espaçamento', () => {
    component.noSpacing = true;
    expect(component.getSpacing()).toEqual('mdl-grid--no-spacing')
  })

});
