import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowTrackingComponent } from './allow-tracking.component';

describe('AllowTrackingComponent', () => {
  let component: AllowTrackingComponent;
  let fixture: ComponentFixture<AllowTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
