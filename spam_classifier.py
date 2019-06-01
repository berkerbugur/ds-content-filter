# -*- coding: utf-8 -*-
"""
Created on Wed Nov 14 05:25:10 2018

@author: bugur
"""

import pickle as pk
import pandas as pd
import ps_preprocess as pp
import warnings
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

warnings.filterwarnings('ignore')

class Pickler():
    def saveMNB(vectorizer, classifier):
        '''
        save classifier to disk
        '''
        with open('model.pkl', 'wb') as infile:
            pk.dump((vectorizer, classifier), infile)
            
    def loadMNB():
        '''
        load classifier from disk
        '''
        with open('model.pkl', 'rb') as file:
          vectorizer, classifier = pk.load(file)
        return vectorizer, classifier

class SpamClassify():
    
    def __init__(self):
        #Read dataset
        tweets = pd.read_csv('SpamAndHam.csv')
        tweets['length'] = tweets['TweetText'].apply(len)
        
        tweetFeatures = tweets['TweetText'].copy()
        tweetFeatures = tweetFeatures.apply(pp.snowball_process)
        vectorizer = TfidfVectorizer("english")
        features = vectorizer.fit_transform(tweetFeatures)
        
        features_train, features_test, labels_train, labels_test = train_test_split(features, tweets['Label'], test_size=0.2, random_state=111)
        
        mnb = MultinomialNB(alpha=0.2)
        mnb.fit(features_train, labels_train)
        
        Pickler.saveMNB(vectorizer, mnb)
    
    def spam_or_ham(self, tweetText):
        vectorizer, mnb = Pickler.loadMNB()
        tweet = []
        tweet.append(tweetText)
        input_transformed = vectorizer.transform(tweet)
        prediction = mnb.predict(input_transformed)
        return prediction[0].item()

    
if __name__ == '__main__': #Main method used for testing
    tweet = 'Simple text for test purposes of the model'
    spammer = SpamClassify()
    predict = spammer.spam_or_ham(tweet)
    print(predict)