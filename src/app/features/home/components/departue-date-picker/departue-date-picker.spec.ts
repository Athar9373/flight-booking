import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartueDatePicker } from './departue-date-picker';

describe('DepartueDatePicker', () => {
  let component: DepartueDatePicker;
  let fixture: ComponentFixture<DepartueDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartueDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartueDatePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
