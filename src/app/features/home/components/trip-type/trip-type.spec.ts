import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripType } from './trip-type';

describe('TripType', () => {
  let component: TripType;
  let fixture: ComponentFixture<TripType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripType],
    }).compileComponents();

    fixture = TestBed.createComponent(TripType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
