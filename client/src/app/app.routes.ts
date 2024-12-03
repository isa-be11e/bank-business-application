import { Routes } from '@angular/router';
import { BusinessAccounts } from './business-accounts/business-accounts.component';
import { MoveMoney } from './move-money/move-money.component';

export const routes: Routes = [
  {path: '', component: BusinessAccounts},
  {path: 'business-accounts', component: BusinessAccounts},
  {path: 'move-money', component: MoveMoney}
];
