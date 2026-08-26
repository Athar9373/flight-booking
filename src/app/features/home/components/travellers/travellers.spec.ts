import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Travellers } from './travellers';

describe('Travellers', () => {
  let component: Travellers;
  let fixture: ComponentFixture<Travellers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Travellers],
    }).compileComponents();

    fixture = TestBed.createComponent(Travellers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
