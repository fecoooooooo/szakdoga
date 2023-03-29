import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoftwaresComponent } from './list-softwares.component';

describe('ListSoftwaresComponent', () => {
  let component: ListSoftwaresComponent;
  let fixture: ComponentFixture<ListSoftwaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoftwaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSoftwaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
