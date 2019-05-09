import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from './recipe.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const RecipeRoutes: Routes = [
  { path: '', component: RecipeComponent, children: [
      { path: '', component: RecipeStartComponent},
      { path: 'newRcp', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent,  canActivate: [AuthGuard]}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(RecipeRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RecipeRoutingModule {}
