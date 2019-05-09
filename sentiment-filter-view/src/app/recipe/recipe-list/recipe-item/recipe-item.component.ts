import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() rcp: Recipe;
  @Input() index: number;
  @Input() tweet: JSON;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {}


}
