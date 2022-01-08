import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWarehouseProductComponent } from './list-warehouse-product.component';

describe('ListWarehouseProductComponent', () => {
  let component: ListWarehouseProductComponent;
  let fixture: ComponentFixture<ListWarehouseProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWarehouseProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWarehouseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
