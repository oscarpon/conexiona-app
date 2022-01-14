import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositionWarehouseComponent } from './reposition-warehouse.component';

describe('RepositionWarehouseComponent', () => {
  let component: RepositionWarehouseComponent;
  let fixture: ComponentFixture<RepositionWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositionWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositionWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
