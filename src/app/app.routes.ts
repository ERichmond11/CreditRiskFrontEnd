import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { ApplyComponent } from './credit/apply/apply';
import { HistoryComponent } from './credit/history/history';
import {CreditWizardComponent} from './credit/wizard/credit-wizard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'wizard', component: CreditWizardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];



