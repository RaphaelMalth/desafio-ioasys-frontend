import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'secure', pathMatch: 'full' },
  {
    path: 'secure',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  { path: 'login', component: LoginComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
