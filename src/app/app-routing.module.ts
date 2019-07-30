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

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'myComponent',
    component: MyComponentComponent
  },
  {
    path: 'page',
    component: PageComponent
  },
  {
    path: 'other',
    component: OtherComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'stylePipe',
    component: StylePipeComponent
  },
  {
    path: 'filling',
    component: FillingComponent
  },
  {
    path: 'date',
    component: DateComponent
  },
  {
    path: 'selection',
    component: SelectionComponent
  },
  {
    path: 'radio',
    component: RadioComponent
  },
  {
    path: 'input',
    component: InputComponent
  },
  {
    path: 'dictionary',
    component: DictionaryComponent
  },
  {
    path: 'textarea',
    component: TextareaComponent
  },
  {
    path: 'crud',
    component: CrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
