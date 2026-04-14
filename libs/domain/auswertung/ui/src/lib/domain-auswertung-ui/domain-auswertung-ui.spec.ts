import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainAuswertungUi } from './domain-auswertung-ui';

describe('DomainAuswertungUi', () => {
  let component: DomainAuswertungUi;
  let fixture: ComponentFixture<DomainAuswertungUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainAuswertungUi],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainAuswertungUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
