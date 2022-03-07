import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementDetailComponent } from './replacement-detail.component';

describe('ReplacementDetailComponent', () => {
  let component: ReplacementDetailComponent;
  let fixture: ComponentFixture<ReplacementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
