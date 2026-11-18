import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorReactivo } from './buscador-reactivo.component';

describe('BuscadorReactivo', () => {
  let component: BuscadorReactivo;
  let fixture: ComponentFixture<BuscadorReactivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorReactivo],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorReactivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
