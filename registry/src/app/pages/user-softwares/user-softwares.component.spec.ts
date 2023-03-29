import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSoftwaresComponent } from './user-softwares.component';

describe('UserSoftwaresComponent', () => {
  let component: UserSoftwaresComponent;
  let fixture: ComponentFixture<UserSoftwaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSoftwaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSoftwaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
