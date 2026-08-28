import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightDetailsModel } from './flight-details-model';

describe('FlightDetailsModel', () => {
  let component: FlightDetailsModel;
  let fixture: ComponentFixture<FlightDetailsModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetailsModel],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDetailsModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
