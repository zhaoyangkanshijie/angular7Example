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

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { state: 'index' }
  },
  {
    path: 'index',
    component: IndexComponent,
    data: { state: 'index' }
  },
  {
    path: 'myComponent',
    component: MyComponentComponent,
    data: { state: 'myComponent' }
  },
  {
    path: 'page',
    component: PageComponent,
    data: { state: 'page' }
  },
  {
    path: 'other',
    component: OtherComponent,
    data: { state: 'other' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { state: 'register' }
  },
  {
    path: 'stylePipe',
    component: StylePipeComponent,
    data: { state: 'stylePipe' }
  },
  {
    path: 'filling',
    component: FillingComponent,
    data: { state: 'filling' }
  },
  {
    path: 'date',
    component: DateComponent,
    data: { state: 'date' }
  },
  {
    path: 'selection',
    component: SelectionComponent,
    data: { state: 'selection' }
  },
  {
    path: 'radio',
    component: RadioComponent,
    data: { state: 'radio' }
  },
  {
    path: 'input',
    component: InputComponent,
    data: { state: 'input' }
  },
  {
    path: 'dictionary',
    component: DictionaryComponent,
    data: { state: 'dictionary' }
  },
  {
    path: 'textarea',
    component: TextareaComponent,
    data: { state: 'textarea' }
  },
  {
    path: 'crud',
    component: CrudComponent,
    data: { state: 'crud' }
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: { state: 'service' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
