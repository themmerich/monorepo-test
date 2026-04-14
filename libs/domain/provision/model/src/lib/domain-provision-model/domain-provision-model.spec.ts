import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainProvisionModel } from './domain-provision-model';

describe('DomainProvisionModel', () => {
  let component: DomainProvisionModel;
  let fixture: ComponentFixture<DomainProvisionModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainProvisionModel],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainProvisionModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
