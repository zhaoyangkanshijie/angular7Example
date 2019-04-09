import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MyComponentComponent } from './pages/my-component/my-component.component';
import { PageComponent } from './pages/page/page.component';
import { OtherComponent } from './pages/other/other.component';
import { RegisterComponent } from './components/register/register.component';
import { StylePipeComponent } from './pages/style-pipe/style-pipe.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
