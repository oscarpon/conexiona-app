import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuildingComponent } from './form-building.component';

describe('FormBuildingComponent', () => {
  let component: FormBuildingComponent;
  let fixture: ComponentFixture<FormBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
