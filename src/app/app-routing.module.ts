import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'candidates',component:CandidatesComponent,canActivate:[AuthGuard]},
  { path:'',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
