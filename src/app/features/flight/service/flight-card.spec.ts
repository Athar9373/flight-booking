import { TestBed } from '@angular/core/testing';
import { FlightCard } from './flight-card';

describe('FlightCard', () => {
  let service: FlightCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
