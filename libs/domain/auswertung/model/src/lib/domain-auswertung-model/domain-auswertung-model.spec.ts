import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainAuswertungModel } from './domain-auswertung-model';

describe('DomainAuswertungModel', () => {
  let component: DomainAuswertungModel;
  let fixture: ComponentFixture<DomainAuswertungModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainAuswertungModel],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainAuswertungModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
