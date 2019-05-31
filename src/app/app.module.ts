import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { OfertarComponent } from './pages/ofertar/ofertar.component';
import { OfertaService } from './oferta.service';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { CvComponent } from './pages/cv/cv.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OfertarComponent,
    OfertasComponent,
    CvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService,
  OfertaService,
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
