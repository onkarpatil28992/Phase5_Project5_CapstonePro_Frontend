import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeProfileComponent } from './edit-employee-profile.component';

describe('EditEmployeeProfileComponent', () => {
  let component: EditEmployeeProfileComponent;
  let fixture: ComponentFixture<EditEmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
