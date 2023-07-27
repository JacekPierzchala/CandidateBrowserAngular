import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { AuthGuard } from './guards/auth.guard';
import { ExternalAuthComponent } from './components/external-auth/external-auth.component';
import { CandidateDetailsComponent } from './components/candidate-details/candidate-details.component';

const routes: Routes = [
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'external-auth',component:ExternalAuthComponent},
  { path:'candidates',component:CandidatesComponent,canActivate:[AuthGuard]},
  { path:'candidates/:id',component:CandidateDetailsComponent,canActivate:[AuthGuard]},
  { path:'',redirectTo:'candidates',pathMatch:'full'},
  { path:'signin-google',redirectTo:'external-auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
