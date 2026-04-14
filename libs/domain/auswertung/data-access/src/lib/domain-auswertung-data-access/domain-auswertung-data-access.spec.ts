import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainAuswertungDataAccess } from './domain-auswertung-data-access';

describe('DomainAuswertungDataAccess', () => {
  let component: DomainAuswertungDataAccess;
  let fixture: ComponentFixture<DomainAuswertungDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainAuswertungDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainAuswertungDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
