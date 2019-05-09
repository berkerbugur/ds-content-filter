import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ShoppingService} from '../shopping/shopping.service';
import {RecipeService} from '../recipe/recipe.service';
import {DbStoreService} from '../shared/db-store.service';
import {AuthService} from '../auth/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoginInterceptor} from '../shared/login.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingService,
    RecipeService,
    DbStoreService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
    ]
})
export class CoreModule {}
