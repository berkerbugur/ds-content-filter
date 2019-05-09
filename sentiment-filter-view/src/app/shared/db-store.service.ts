import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe/recipe.service';
import {ShoppingService} from '../shopping/shopping.service';
import {Recipe} from '../recipe/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DbStoreService {
  constructor(private httpClient: HttpClient,
              private recipes: RecipeService,
              private shopping: ShoppingService,
              private auth: AuthService) {}

  storeRcp() {
    const token = this.auth.getToken();
    /*const headers = new HttpHeaders().set('Authorization', 'bearer şdslsklfsl');*/

    // return this.httpClient.put('https://rcpbook-be9bb.firebaseio.com/recipes.json', this.recipes.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    // });
    const req = new HttpRequest('PUT', 'https://rcpbook-be9bb.firebaseio.com/recipes.json', this.recipes.getRecipes(), {
      params: new HttpParams().set('auth', token),
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  fetchRcp() {
    const token = this.auth.getToken();

    return this.httpClient.get<Recipe[]>('https://rcpbook-be9bb.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('auth', token)
    })
      .pipe(map((recipes) => {
        for (let rcp of recipes) {
          if (!rcp['ingredients']) {
            console.log(rcp);
            rcp['ingredients'] = [];
          }
        }
        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipes.setRcp(recipes);
      });
  }

}
