import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {DbStoreService} from '../shared/db-store.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],

})
export class RecipeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
