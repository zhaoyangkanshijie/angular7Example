import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MyComponentComponent } from './pages/my-component/my-component.component';
import { PageComponent } from './pages/page/page.component';
import { OtherComponent } from './pages/other/other.component';
import { RegisterComponent } from './components/register/register.component';
import { StylePipeComponent } from './pages/style-pipe/style-pipe.component';
import { FillingComponent } from './pages/filling/filling.component';
import { DateComponent } from './pages/date/date.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { RadioComponent } from './pages/radio/radio.component';
import { InputComponent } from './pages/input/input.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { TextareaComponent } from './pages/textarea/textarea.component';
import { CrudComponent } from './pages/crud/crud.component';
import { ServiceComponent } from './pages/service/service.component';
import { AuthGuard } from './modules/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { state: 'index' },
    canActivate: [AuthGuard]
  },
  {
    path: 'index',
    component: IndexComponent,
    data: { state: 'index' },
    canActivate: [AuthGuard]
  },
  {
    path: 'myComponent',
    component: MyComponentComponent,
    data: { state: 'myComponent' },
    canActivate: [AuthGuard]
  },
  {
    path: 'page',
    component: PageComponent,
    data: { state: 'page' },
    canActivate: [AuthGuard]
  },
  {
    path: 'other',
    component: OtherComponent,
    data: { state: 'other' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { state: 'register' },
    canActivate: [AuthGuard]
  },
  {
    path: 'stylePipe',
    component: StylePipeComponent,
    data: { state: 'stylePipe' },
    canActivate: [AuthGuard]
  },
  {
    path: 'filling',
    component: FillingComponent,
    data: { state: 'filling' },
    canActivate: [AuthGuard]
  },
  {
    path: 'date',
    component: DateComponent,
    data: { state: 'date' },
    canActivate: [AuthGuard]
  },
  {
    path: 'selection',
    component: SelectionComponent,
    data: { state: 'selection' },
    canActivate: [AuthGuard]
  },
  {
    path: 'radio',
    component: RadioComponent,
    data: { state: 'radio' },
    canActivate: [AuthGuard]
  },
  {
    path: 'input',
    component: InputComponent,
    data: { state: 'input' },
    canActivate: [AuthGuard]
  },
  {
    path: 'dictionary',
    component: DictionaryComponent,
    data: { state: 'dictionary' },
    canActivate: [AuthGuard]
  },
  {
    path: 'textarea',
    component: TextareaComponent,
    data: { state: 'textarea' },
    canActivate: [AuthGuard]
  },
  {
    path: 'crud',
    component: CrudComponent,
    data: { state: 'crud' },
    canActivate: [AuthGuard]
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: { state: 'service' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
