import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialFares } from './special-fares';

describe('SpecialFares', () => {
  let component: SpecialFares;
  let fixture: ComponentFixture<SpecialFares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialFares],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialFares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
