import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
// import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataentriesComponent } from './dataentries/dataentries.component';

const routes: Routes = [
  { path: '', component: DataentriesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard] },
  // { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // Redirect to home.
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
