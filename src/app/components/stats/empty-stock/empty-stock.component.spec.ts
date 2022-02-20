import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStockComponent } from './empty-stock.component';

describe('EmptyStockComponent', () => {
  let component: EmptyStockComponent;
  let fixture: ComponentFixture<EmptyStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
