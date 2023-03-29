import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLifecycleComponent } from './software-lifecycle.component';

describe('SoftwareLifecycleComponent', () => {
  let component: SoftwareLifecycleComponent;
  let fixture: ComponentFixture<SoftwareLifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareLifecycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
