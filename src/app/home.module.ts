import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './services/storage.service';

import { Home } from './home.component';

import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { SimpleInputComponent } from './components/simple-input/simple-input.component';
import { RadioBoxComponent } from './components/radio-box/radio-box.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

import { IndexComponent } from './pages/index/index.component';
import { MyComponentComponent } from './pages/my-component/my-component.component';
import { PageComponent } from './pages/page/page.component';
import { OtherComponent } from './pages/other/other.component';
import { StylePipeComponent } from './pages/style-pipe/style-pipe.component';
import { FillingComponent } from './pages/filling/filling.component';
import { DateComponent } from './pages/date/date.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { RadioComponent } from './pages/radio/radio.component';
import { InputComponent } from './pages/input/input.component';

import { MyHtmlPipe } from './pipes/myhtml.pipe';

import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    Home,
    HeaderComponent,
    IndexComponent,
    MyComponentComponent,
    PageComponent,
    OtherComponent,
    InputBoxComponent,
    RegisterComponent,
    MyHtmlPipe,
    StylePipeComponent,
    SelectBoxComponent,
    ClickOutsideDirective,
    FillingComponent,
    SimpleInputComponent,
    RadioBoxComponent,
    InputSelectComponent,
    DateSelectorComponent,
    DateComponent,
    SelectionComponent,
    RadioComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService,StorageService],
  bootstrap: [Home]
})
export class HomeModule { }
