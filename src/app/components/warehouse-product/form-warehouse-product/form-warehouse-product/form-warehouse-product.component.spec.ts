import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWarehouseProductComponent } from './form-warehouse-product.component';

describe('FormWarehouseProductComponent', () => {
  let component: FormWarehouseProductComponent;
  let fixture: ComponentFixture<FormWarehouseProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWarehouseProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWarehouseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
