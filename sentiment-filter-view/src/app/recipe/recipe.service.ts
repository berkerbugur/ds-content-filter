import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping/shopping.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  rcpChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe( rcpId: number) {
    return this.recipes[rcpId];
  }

  recipeToShopping(ingredients: Ingredient[]) {
      this.shoppingService.addIngredients(ingredients);
  }

  addRcp(recipe: Recipe) {
    this.recipes.push(recipe);
    this.rcpChange.next(this.recipes.slice());
  }

  updateRcp(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.rcpChange.next(this.recipes.slice());
  }

  deleteRcp(index: number) {
    this.recipes.splice(index, 1);
    this.rcpChange.next(this.recipes.slice());
  }

  setRcp(recipes: Recipe[]) {
    this.recipes = recipes;
    this.rcpChange.next(this.recipes.slice());
  }
}
