import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingComponent } from './list-building.component';

describe('ListBuildingComponent', () => {
  let component: ListBuildingComponent;
  let fixture: ComponentFixture<ListBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
