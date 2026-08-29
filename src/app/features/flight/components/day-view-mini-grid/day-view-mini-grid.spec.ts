import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayViewMiniGrid } from './day-view-mini-grid';

describe('DayViewMiniGrid', () => {
  let component: DayViewMiniGrid;
  let fixture: ComponentFixture<DayViewMiniGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayViewMiniGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(DayViewMiniGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
