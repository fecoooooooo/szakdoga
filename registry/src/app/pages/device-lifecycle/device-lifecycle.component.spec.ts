import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLifecycleComponent } from './device-lifecycle.component';

describe('DeviceLifecycleComponent', () => {
  let component: DeviceLifecycleComponent;
  let fixture: ComponentFixture<DeviceLifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceLifecycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
