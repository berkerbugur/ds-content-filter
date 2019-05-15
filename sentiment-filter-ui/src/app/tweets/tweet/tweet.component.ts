import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() sentiment: boolean;
  @Input() spam: boolean;
  @Input() subject: boolean;
  @Input() index: number;
  @Input() tweet: JSON;
  sentimentVal: string;

  constructor() {
  }

  ngOnInit() {
    // @ts-ignore
    if (this.tweet.sentiment < 0) { this.sentimentVal = 'NEGATIVE'; }
    else { // @ts-ignore
      if (this.tweet.sentiment === 0) { this.sentimentVal = 'NEUTRAL'; }
          else { // @ts-ignore
            if (this.tweet.sentiment > 0) { this.sentimentVal = 'POSITIVE'; }
          }
    }
  }
}
