import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareHistoryComponent } from './software-history.component';

describe('SoftwareHistoryComponent', () => {
  let component: SoftwareHistoryComponent;
  let fixture: ComponentFixture<SoftwareHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
