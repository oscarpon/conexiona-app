import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductComponent } from './warehouse-product.component';

describe('WarehouseProductComponent', () => {
  let component: WarehouseProductComponent;
  let fixture: ComponentFixture<WarehouseProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
