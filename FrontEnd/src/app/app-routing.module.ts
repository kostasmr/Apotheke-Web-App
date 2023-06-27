import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EditPageComponent } from './components/pages/edit-page/edit-page.component';
import { BagPageComponent } from './components/pages/bag-page/bag-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'search/:searchTerm', component:HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'product/:id', component: EditPageComponent },
  { path: 'editPage/:product', component: EditPageComponent},
  { path: 'bag-page', component: BagPageComponent},
  { path: 'login', component: LoginPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
