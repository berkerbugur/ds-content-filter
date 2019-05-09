import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {DbStoreService} from '../../shared/db-store.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editActive = false;
  recipesF: FormGroup;

  constructor(private route: ActivatedRoute, private rcpService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editActive = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    const newRcp = new Recipe(
      this.recipesF.value['name'],
      this.recipesF.value['description'],
      this.recipesF.value['imgPath'],
      this.recipesF.value['ingredients']);

    if (this.editActive) {
      this.rcpService.updateRcp(this.id, newRcp);
    } else {
      this.rcpService.addRcp(newRcp);
    }
    this.onCancel();
}
  get controls() {
    return (<FormArray>this.recipesF.get('ingredients')).controls;
  }

  private initForm() {
    let rcpName = '';
    let rcpImg = '';
    let rcpDesc = '';
    const recipeIngr = new FormArray([]);

    if (this.editActive) {
      const rcp = this.rcpService.getRecipe(this.id);
      rcpName =  rcp.name;
      rcpImg = rcp.imagePath;
      rcpDesc = rcp.description;
      if (rcp['ingredients']) {
        for (const ingr of rcp.ingredients) {
          recipeIngr.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount, [
                Validators.required,
                Validators.pattern(/[1-9]+[0-9]*$/),
              ])
            })
          );
        }
      }
    }
    this.recipesF = new FormGroup({
      'name': new FormControl(rcpName, Validators.required),
      'imgPath': new FormControl(rcpImg, Validators.required),
      'description': new FormControl(rcpDesc, Validators.required),
      'ingredients': recipeIngr
    });
  }

  onAddIngr() {
    (<FormArray>this.recipesF.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngr(index: number) {
    (<FormArray>this.recipesF.get('ingredients')).removeAt(index);
  }

}
