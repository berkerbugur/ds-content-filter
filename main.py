#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu May  9 10:32:05 2019

@author: berker
"""

import tweet_catch as tC
import spam_classifier as sC
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS


app = Flask('sentimentApp')
CORS(app)
api = Api(app)

class Tweets(Resource):
    def __init__(self):
        self.twitter_client = tC.TwitterClient()
        self.tweet_analyze = tC.TweetAnalyze()
        self.spam_analyze = sC.SpamClassify()
        
    def get(self):
        ### HOLY MOTHER OF DATA LIMIT ###
        tweets = self.twitter_client.get_live_feed(30)
        allData = []
        for tweet in tweets:
            ###Start of the creation of AnalysisAPI
            tweetDict = {}
            sentiment = self.tweet_analyze.sentiment_analyzer(tweet.text)
            subjectivity = self.tweet_analyze.subject_val(tweet.text)
            spammicity = self.spam_analyze.spam_or_ham(tweet.text)
            tweetDict['userName'] = tweet.user.name
            tweetDict['screenName'] = tweet.user.screen_name
            tweetDict['userProfileLink'] = 'https://twitter.com/' + tweet.user.name
            tweetDict['profilePic'] = tweet.user.profile_image_url_https
            tweetDict['profileColor'] = tweet.user.profile_link_color
            tweetDict['location'] = tweet.user.location
            tweetDict['followers'] = tweet.user.followers_count
            tweetDict['tweetId'] = tweet.id
            tweetDict['tweetLink'] = 'https://twitter.com/statuses/' + str(tweet.id)
            tweetDict['tweetText'] = tweet.text
            tweetDict['likes'] = tweet.favorite_count
            tweetDict['retweets'] = tweet.retweet_count
            tweetDict['spam'] = spammicity
            tweetDict['sentiment'] = sentiment
            tweetDict['subject'] = subjectivity
            allData.append(tweetDict)
        return allData

api.add_resource(Tweets, '/tweets') #api route

if __name__ == '__main__':
    app.run(port=5002)