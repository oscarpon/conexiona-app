import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHospitalComponent } from './form-hospital.component';

describe('FormHospitalComponent', () => {
  let component: FormHospitalComponent;
  let fixture: ComponentFixture<FormHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
