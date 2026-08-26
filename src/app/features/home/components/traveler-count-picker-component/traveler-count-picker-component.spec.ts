import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerCountPickerComponent } from './traveler-count-picker-component';

describe('TravelerCountPickerComponent', () => {
  let component: TravelerCountPickerComponent;
  let fixture: ComponentFixture<TravelerCountPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerCountPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerCountPickerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
