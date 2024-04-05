import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartureComponent } from './add-departure.component';

describe('AddDepartureComponent', () => {
  let component: AddDepartureComponent;
  let fixture: ComponentFixture<AddDepartureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartureComponent]
    });
    fixture = TestBed.createComponent(AddDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
