import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StopsFilter } from './stops-filter';

describe('StopsFilter', () => {
  let component: StopsFilter;
  let fixture: ComponentFixture<StopsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopsFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(StopsFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
