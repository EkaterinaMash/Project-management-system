import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss']
})
export class LanguageToggleComponent {
  appLanguage = 'English';
  languageList = [
    {code: 'en', label: 'English'},
    {code: 'ru', label: 'Русский'}]

  constructor(private translate: TranslateService) {
  }

  changeLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find(language => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.appLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
  }
}
