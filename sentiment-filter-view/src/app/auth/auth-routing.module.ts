import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';

const AuthRoutes: Routes = [
  { path: 'signUp', component: SignUpComponent},
  { path: 'signIn', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
