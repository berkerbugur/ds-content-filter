import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  ingredientChange = new Subject<Ingredient[]>();
  startedEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Pasta', 5),
    new Ingredient('Zucchini', 1)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredients(ing: Ingredient[]) {
    this.ingredients.push(...ing);
    this.ingredientChange.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }
}
