#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu May  9 10:32:05 2019

@author: berker
"""

import tweet_catch as tC
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS


app = Flask('sentimentApp')
CORS(app)
api = Api(app)

class Tweets(Resource):
    def get(self):
        twitter_client = tC.TwitterClient()
        tweet_analyze = tC.TweetAnalyze()
        ### HOLY MOTHER OF DATA LIMIT ###
        tweets = twitter_client.get_live_feed(20)
        allData = []    
        for tweet in tweets:
            ###Start of the creation of AnalysisAPI
            tweetDict = {}
            sentiment = tweet_analyze.sentiment_analyzer(tweet.text)
            tweetDict['userName'] = tweet.user.name
            tweetDict['screenName'] = tweet.user.screen_name
            tweetDict['userId'] = tweet.user.id
            tweetDict['profilePic'] = tweet.user.profile_image_url_https
            tweetDict['profileColor'] = tweet.user.profile_link_color
            tweetDict['location'] = tweet.user.location       
            tweetDict['followers'] = tweet.user.followers_count
            tweetDict['tweetId'] = tweet.id
            tweetDict['tweetText'] = tweet.text
            tweetDict['likes'] = tweet.favorite_count
            tweetDict['retweets'] = tweet.retweet_count
            tweetDict['sentiment'] = sentiment
            allData.append(tweetDict)
        return allData

api.add_resource(Tweets, '/tweets') #tweet route

if __name__ == '__main__':
    app.run(port=5002)