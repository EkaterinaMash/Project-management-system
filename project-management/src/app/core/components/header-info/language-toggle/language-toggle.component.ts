import {Component, Inject, LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss']
})
export class LanguageToggleComponent {
  locales = [
    {code: 'en', name: 'EN'},
    {code: 'ru', name: 'RU'}
  ];

  constructor(@Inject(LOCALE_ID) public activeLocale: string) {
  }

  onChange() {
    this.activeLocale = 'en' ? 'ru' : 'en';
  }
}
