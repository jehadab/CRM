import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangmentcomplaintComponent } from './mangmentcomplaint.component';

describe('MangmentcomplaintComponent', () => {
  let component: MangmentcomplaintComponent;
  let fixture: ComponentFixture<MangmentcomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangmentcomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangmentcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
