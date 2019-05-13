import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetComponent } from './tweets/tweet/tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TweetsComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
