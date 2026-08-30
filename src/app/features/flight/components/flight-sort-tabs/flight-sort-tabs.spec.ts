import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightSortTabs } from './flight-sort-tabs';

describe('FlightSortTabs', () => {
  let component: FlightSortTabs;
  let fixture: ComponentFixture<FlightSortTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSortTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSortTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
