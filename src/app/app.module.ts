import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { SharedModule } from './modules/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { CandidatesFiltersComponent } from './components/candidates-filters/candidates-filters.component';
import { ExternalAuthComponent } from './components/external-auth/external-auth.component';
import { CandidateDetailsComponent } from './components/candidate-details/candidate-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    CandidatesComponent,
    NavComponent,
    CandidateListComponent,
    CandidateCardComponent,
    AccessDeniedComponent,
    CandidatesFiltersComponent,
    ExternalAuthComponent,
    CandidateDetailsComponent,
    NotFoundComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
