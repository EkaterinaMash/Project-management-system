import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageToggleComponent } from './components/header-info/language-toggle/language-toggle.component';
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { SignUpComponent } from './components/header-info/sign-up/sign-up.component';
import { LogInComponent } from './components/header-info/log-in/log-in.component';
import { AuthorComponent } from './components/footer-info/author/author.component';
import { CourseComponent } from './components/footer-info/course/course.component';
import {MatButton, MatButtonModule} from "@angular/material/button";
import { NavigationComponent } from './components/header-info/navigation/navigation.component';
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LanguageToggleComponent,
    SignUpComponent,
    LogInComponent,
    AuthorComponent,
    CourseComponent,
    NavigationComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        MatSlideToggleModule,
        MatButtonModule,
        RouterModule,
        MatListModule
    ]
})
export class CoreModule { }
