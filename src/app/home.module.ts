import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './services/storage.service';

import { Home } from './home.component';

import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './pages/index/index.component';
import { MyComponentComponent } from './pages/my-component/my-component.component';
import { PageComponent } from './pages/page/page.component';
import { OtherComponent } from './pages/other/other.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { RegisterComponent } from './components/register/register.component';

import { MyHtmlPipe } from './pipes/myhtml.pipe';

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
    MyHtmlPipe
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
