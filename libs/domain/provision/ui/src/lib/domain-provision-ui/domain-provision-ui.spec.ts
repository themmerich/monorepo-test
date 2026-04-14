import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainProvisionUi } from './domain-provision-ui';

describe('DomainProvisionUi', () => {
  let component: DomainProvisionUi;
  let fixture: ComponentFixture<DomainProvisionUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainProvisionUi],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainProvisionUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
