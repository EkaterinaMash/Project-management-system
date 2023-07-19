import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputColumnDataComponent } from './input-column-data.component';

describe('InputColumnDataComponent', () => {
  let component: InputColumnDataComponent;
  let fixture: ComponentFixture<InputColumnDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputColumnDataComponent]
    });
    fixture = TestBed.createComponent(InputColumnDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
