import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTodosComponent } from './load-todos.component';

describe('LoadTodosComponent', () => {
  let component: LoadTodosComponent;
  let fixture: ComponentFixture<LoadTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadTodosComponent]
    });
    fixture = TestBed.createComponent(LoadTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
