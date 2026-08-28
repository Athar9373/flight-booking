import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaresView } from './fares-view';

describe('FaresView', () => {
  let component: FaresView;
  let fixture: ComponentFixture<FaresView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaresView],
    }).compileComponents();

    fixture = TestBed.createComponent(FaresView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
