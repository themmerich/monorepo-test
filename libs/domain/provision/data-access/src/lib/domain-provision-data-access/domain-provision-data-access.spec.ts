import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainProvisionDataAccess } from './domain-provision-data-access';

describe('DomainProvisionDataAccess', () => {
  let component: DomainProvisionDataAccess;
  let fixture: ComponentFixture<DomainProvisionDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainProvisionDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainProvisionDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
