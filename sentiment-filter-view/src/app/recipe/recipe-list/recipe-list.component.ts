import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  rcpSub: Subscription;

  constructor(private recipeService: RecipeService, public auth: AuthService) { }

  ngOnInit() {
    this.rcpSub = this.recipeService.rcpChange
      .subscribe(
        (newRecipe: Recipe[]) => {
          this.recipes = newRecipe;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.rcpSub.unsubscribe();
  }


}
