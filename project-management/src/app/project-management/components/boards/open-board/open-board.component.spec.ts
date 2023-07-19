import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBoardComponent } from './open-board.component';

describe('OpenBoardComponent', () => {
  let component: OpenBoardComponent;
  let fixture: ComponentFixture<OpenBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenBoardComponent]
    });
    fixture = TestBed.createComponent(OpenBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
