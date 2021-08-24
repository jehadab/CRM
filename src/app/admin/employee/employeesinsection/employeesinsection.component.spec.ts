import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesinsectionComponent } from './employeesinsection.component';

describe('EmployeesinsectionComponent', () => {
  let component: EmployeesinsectionComponent;
  let fixture: ComponentFixture<EmployeesinsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesinsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesinsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
