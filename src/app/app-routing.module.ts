import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { OfertarComponent } from './pages/ofertar/ofertar.component';
import { CvComponent } from './pages/cv/cv.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';

const routes: Routes = [
  {path: '', redirectTo: 'login  ', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ofertar', component: OfertarComponent},
  {path: 'cv', component: CvComponent},
  {path: 'ofertas', component: OfertasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Title]
})
export class AppRoutingModule { }
