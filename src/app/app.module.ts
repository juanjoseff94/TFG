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
import { FilterPipe } from './filter.pipe';
import { CandidaturaService } from './candidatura.service';
import { CandidaturasComponent } from './pages/candidaturas/candidaturas.component';
import { CandidaturaFilterPipe } from './candidatura-filter.pipe';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';
import { CandidatosFilterPipe } from './candidatos-filter.pipe';
import { CvReferalsComponent } from './pages/cv-referals/cv-referals.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OfertarComponent,
    OfertasComponent,
    CvComponent,
    FilterPipe,
    CandidaturasComponent,
    CandidaturaFilterPipe,
    CandidatosComponent,
    CandidatosFilterPipe,
    CvReferalsComponent
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
  DatePipe,
  CandidaturaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
