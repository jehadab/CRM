import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseremployeeComponent } from './useremployee.component';

describe('UseremployeeComponent', () => {
  let component: UseremployeeComponent;
  let fixture: ComponentFixture<UseremployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseremployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseremployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
