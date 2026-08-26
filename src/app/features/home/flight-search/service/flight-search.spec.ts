import { TestBed } from '@angular/core/testing';
import { FlightSearch } from './flight-search';

describe('FlightSearch', () => {
  let service: FlightSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
