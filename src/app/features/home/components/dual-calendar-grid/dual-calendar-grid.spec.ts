import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualCalendarGrid } from './dual-calendar-grid';

describe('DualCalendarGrid', () => {
  let component: DualCalendarGrid;
  let fixture: ComponentFixture<DualCalendarGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DualCalendarGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(DualCalendarGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
