import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  rcpSub: Subscription;
  tweets: JSON;

  constructor(private recipeService: RecipeService, public auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    //this.getTweets();
    this.tweets = [
      {
        "userName": "Amazon Web Services",
        "screenName": "awscloud",
        "userId": 66780587,
        "profilePic": "https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt_normal.jpg",
        "profileColor": "FF9900",
        "location": "Seattle, WA",
        "followers": 1733356,
        "tweetId": 1126457849016725504,
        "tweetText": "RT @AWSonAir: We\u2019re backstage with @darren_mowry talking about the #AWSSummit London keynote! \ud83c\uddec\ud83c\udde7 https://t.co/y4YmGXPMx2",
        "likes": 0,
        "retweets": 7,
        "sentiment": 0
      },
      {
        "userName": "Amazon Web Services",
        "screenName": "awscloud",
        "userId": 66780587,
        "profilePic": "https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt_normal.jpg",
        "profileColor": "FF9900",
        "location": "Seattle, WA",
        "followers": 1733356,
        "tweetId": 1126457291342000129,
        "tweetText": "We've got your back! Chukwuemeka is here to guide you through the process of troubleshooting partial DNS failures.\u2026 https://t.co/xXMT18X3V6",
        "likes": 7,
        "retweets": 2,
        "sentiment": -1
      },
      {
        "userName": "Docker",
        "screenName": "Docker",
        "userId": 1138959692,
        "profilePic": "https://pbs.twimg.com/profile_images/1125861889546674176/IarXT5oY_normal.png",
        "profileColor": "0084B4",
        "location": "San Francisco, CA",
        "followers": 341511,
        "tweetId": 1126456914962014208,
        "tweetText": "So much happened at this year\u2019s #DockerCon in #SanFrancisco. Here's a recap to highlight the best content from the\u2026 https://t.co/DNms5bayV2",
        "likes": 2,
        "retweets": 0,
        "sentiment": 1
      }];

    this.rcpSub = this.recipeService.rcpChange
      .subscribe(
        (newRecipe: Recipe[]) => {
          this.recipes = newRecipe;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.rcpSub.unsubscribe();
  }

  getTweets() {
    this.http.get('http://127.0.0.1:5002/tweets').subscribe( data => {
      this.tweets = data as JSON;
    });
  }


}
