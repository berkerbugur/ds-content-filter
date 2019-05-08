# -*- coding: utf-8 -*-
"""
Created on Thu Mar 28 13:38:19 2019

@author: bugur
"""

from tweepy import API
from tweepy import Cursor
from tweepy import OAuthHandler
import pandas as pd
import numpy as np
from textblob import TextBlob as tb
import re
import warnings

warnings.filterwarnings('ignore')


import twitter_credentials as TC

### AUTHENTICATION HANDLER ###
class AuthenticateApp():
    
    def authenticate_app(self):
        auth = OAuthHandler(TC.CONSUMER_KEY, TC.CONSUMER_KEY_SECRET)
        auth.set_access_token(TC.ACCES_TOKEN, TC.ACCES_TOKEN_SECRET)    
        return auth

### TWITTER CLIENT HANDLER ###
class TwitterClient():
    """
    @param user_name is for when instantiating the client obj, if you want to get
    specific users data, pass the username in the function(as a string). 'none' is 
    the default value for nothing entered and will use app(root)owner profile timeline.
    """
    
    def __init__(self, user_name=None):
        self.auth = AuthenticateApp().authenticate_app()
        self.twitter_client = API(self.auth)
        
        self.user_name = user_name
        
    def get_twitter_client_api(self):
        return self.twitter_client
    
    def get_timeline_tweets(self, num_of_tweets):
        """
        Get tweet(s) from the user/app timeline given the number of tweets
        """
        tweet_list = []
        
        for tweet in Cursor(self.twitter_client.user_timeline, id=self.user_name).items(num_of_tweets):
            tweet_list.append(tweet)
        return tweet_list
    
    def get_live_feed(self, num_of_tweets):
        
        live_tweets = []
        
        for tweet in Cursor(self.twitter_client.home_timeline, id=self.user_name).items(num_of_tweets):
            live_tweets.append(tweet)
        return live_tweets
    
    def on_error(self, status):
        if status == 420:
            return False
        print(status)

class TweetAnalyze():
    
    def tweets_to_data_frame(self, tweets):
        df = pd.DataFrame(data=[tweet.text for tweet in tweets], columns=['Tweets'])

        df['id'] = np.array([tweet.id for tweet in tweets])
        df['date'] = np.array([tweet.created_at for tweet in tweets])
        df['source'] = np.array([tweet.source for tweet in tweets])
        df['likes'] = np.array([tweet.favorite_count for tweet in tweets])
        df['retweets'] = np.array([tweet.retweet_count for tweet in tweets])

        return df
    
    def clean_tweet(self, tweet):
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
    
    def sentiment_analyzer(self, tweet):
        analysis = tb(self.clean_tweet(tweet))
        if analysis.sentiment.polarity > 0:
            return 1
        elif analysis.sentiment.polarity == 0:
            return 0
        else:
            return -1

### DRIVER METHOD TO EXECUTE ON ACTIVE PATH ###
### ANLIK DOSYA İÇİNDE ÇALIŞAN MAIN METODU ###
if __name__ == '__main__':
    
    twitter_client = TwitterClient()
    tweet_analyze = TweetAnalyze()
    
    ###HOLY MOTHER OF DATA LIMIT
    tweets = twitter_client.get_live_feed(20)
    allData = []
    
    for tweet in tweets:
        tt = tweet.text
        tweetDict = {}
        sentiment = tweet_analyze.sentiment_analyzer(tt)
        tweetDict['tweetText'] = tt
        tweetDict['sentiment'] = sentiment
        ###Object construction is da wei brudda
        allData.append(tweetDict)
        print(allData)
        
    '''
    tweetList = []
    tweetList.append(tweets[0].text)
    print(tweetList)
    print(tweets[0].user.screen_name)
    '''