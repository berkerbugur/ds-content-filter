#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu May  9 10:32:05 2019

@author: berker
"""
import tweet_catch as tC

twitter_client = tC.TwitterClient()
tweet_analyze = tC.TweetAnalyze()

    ###HOLY MOTHER OF DATA LIMIT
tweets = twitter_client.get_live_feed(20)
allData = []

for tweet in tweets:
    ###Object construction is da wei brudda
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
    print(allData)