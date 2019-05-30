import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  tweets: any;
  spamControl: boolean;
  sentimentControl: boolean;
  subjectControl: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.spamControl = false;
    this.sentimentControl = false;
    this.subjectControl = false;

    this.getTweets();
    /*
    this.tweets = [
      {
        "userName": "JavaScript Daily",
        "screenName": "JavaScriptDaily",
        "userId": 459275531,
        "profilePic": "https://pbs.twimg.com/profile_images/988505844915556354/lgUSY3mZ_normal.jpg",
        "profileColor": "D4BB00",
        "location": "",
        "followers": 354664,
        "tweetId": 1127744773459185665,
        "tweetLink": "https://twitter.com/statuses/1127744773459185665",
        "tweetText": "12 Tips for Writing Clean and Scalable JavaScript: https://t.co/6CzMAeUjcG",
        "likes": 191,
        "retweets": 59,
        "spam": 1,
        "sentiment": 1,
        "subject": 0.7000000000000001
      },
      {
        "userName": "Amazon Web Services",
        "screenName": "awscloud",
        "userId": 66780587,
        "profilePic": "https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt_normal.jpg",
        "profileColor": "FF9900",
        "location": "Seattle, WA",
        "followers": 1734143,
        "tweetId": 1127710297672814593,
        "tweetLink": "https://twitter.com/statuses/1127710297672814593",
        "tweetText": "Have you challenged how you think about your databases? Learn about the benefits of going cloud-native in our eBook\u2026 https://t.co/3bm1uLSFM8",
        "likes": 21,
        "retweets": 5,
        "spam": 0,
        "sentiment": 0,
        "subject": 0.0
      },
      {
        "userName": "Amazon Web Services",
        "screenName": "awscloud",
        "userId": 66780587,
        "profilePic": "https://pbs.twimg.com/profile_images/907652118688829440/FrshWMKt_normal.jpg",
        "profileColor": "FF9900",
        "location": "Seattle, WA",
        "followers": 1734143,
        "tweetId": 1127710297672814593,
        "tweetLink": "https://twitter.com/statuses/1127710297672814593",
        "tweetText": "Have you challenged how you think about your databases? Learn about the benefits of going cloud-native in our eBook\u2026 https://t.co/3bm1uLSFM8",
        "likes": 21,
        "retweets": 5,
        "spam": 0,
        "sentiment": -1,
        "subject": 0.0
      }
    ];
    */
  }


  getTweets(){
    this.http.get('http://127.0.0.1:5002/tweets').subscribe( data => {
      this.tweets = data as JSON;
    });
  }

  controlSentiment() {
    this.sentimentControl = !this.sentimentControl;
  }
  controlSpam() {
    this.spamControl = !this.spamControl;
  }
  controlSubject(){
    this.subjectControl = !this.subjectControl;
  }
}
