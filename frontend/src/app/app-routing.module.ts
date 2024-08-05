import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { Page3Component } from './components/page3/page3.component';
import { Page4Component } from './components/page4/page4.component';
import { Page5Component } from './components/page5/page5.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './services/auth.guard';  // AuthGuard'ı import edin

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'page1', component: Page1Component, canActivate: [AuthGuard] },
  { path: 'page2', component: Page2Component, canActivate: [AuthGuard] },
  { path: 'page3', component: Page3Component, canActivate: [AuthGuard] },
  { path: 'page4', component: Page4Component, canActivate: [AuthGuard] },
  { path: 'page5', component: Page5Component, canActivate: [AuthGuard] },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
