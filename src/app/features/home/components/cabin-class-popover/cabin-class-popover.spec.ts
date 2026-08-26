import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinClassPopover } from './cabin-class-popover';

describe('CabinClassPopover', () => {
  let component: CabinClassPopover;
  let fixture: ComponentFixture<CabinClassPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinClassPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(CabinClassPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
