import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDatePicker } from './return-date-picker';

describe('ReturnDatePicker', () => {
  let component: ReturnDatePicker;
  let fixture: ComponentFixture<ReturnDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnDatePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
