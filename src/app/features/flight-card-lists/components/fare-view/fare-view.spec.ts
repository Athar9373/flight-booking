import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FareView } from './fare-view';

describe('FareView', () => {
  let component: FareView;
  let fixture: ComponentFixture<FareView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareView],
    }).compileComponents();

    fixture = TestBed.createComponent(FareView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
