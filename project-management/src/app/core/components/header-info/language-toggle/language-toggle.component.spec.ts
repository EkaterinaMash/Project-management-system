import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageToggleComponent } from './language-toggle.component';

describe('LanguageToggleComponent', () => {
  let component: LanguageToggleComponent;
  let fixture: ComponentFixture<LanguageToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageToggleComponent]
    });
    fixture = TestBed.createComponent(LanguageToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
