import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avtaar } from './avtaar';

describe('Avtaar', () => {
  let component: Avtaar;
  let fixture: ComponentFixture<Avtaar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avtaar],
    }).compileComponents();

    fixture = TestBed.createComponent(Avtaar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
