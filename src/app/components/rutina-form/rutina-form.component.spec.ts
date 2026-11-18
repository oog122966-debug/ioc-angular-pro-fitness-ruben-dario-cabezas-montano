import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinaForm } from './rutina-form.component';

describe('RutinaForm', () => {
  let component: RutinaForm;
  let fixture: ComponentFixture<RutinaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RutinaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
