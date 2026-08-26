import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPopover } from './city-popover';

describe('CityPopover', () => {
  let component: CityPopover;
  let fixture: ComponentFixture<CityPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(CityPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
