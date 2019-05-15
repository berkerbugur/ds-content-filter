# -*- coding: utf-8 -*-
"""
Created on Wed Nov 14 05:25:10 2018

@author: bugur
"""

import pickle as pk
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import ps_preprocess as pp
import warnings
from wordcloud import WordCloud
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics

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
            
        spam_words = ' '.join(list(tweets[tweets['Label'] == 1]['TweetText']))
        spam_Vcloud = WordCloud(width = 512, height = 512).generate(spam_words)
        plt.figure(figsize = (10, 8), facecolor = 'k')
        plt.imshow(spam_Vcloud)
        plt.axis('off')
        plt.tight_layout(pad = 0)
        print('*********** SPAM WORD CLOUD ***********')
        plt.show()
        print('\n------------------\n')
            
        ham_words = ' '.join(list(tweets[tweets['Label'] == 0]['TweetText']))
        ham_Vcloud = WordCloud(width = 512, height = 512).generate(ham_words)
        plt.figure(figsize = (10, 8), facecolor = 'k')
        plt.imshow(ham_Vcloud)
        plt.axis('off')
        plt.tight_layout(pad = 0)
        print('*********** HAM WORD CLOUD ***********')
        plt.show()
        print('\n------------------\n')
        
        tweetFeatures = tweets['TweetText'].copy()
        tweetFeatures = tweetFeatures.apply(pp.snowball_process)
        vectorizer = TfidfVectorizer("english")
        features = vectorizer.fit_transform(tweetFeatures)
        
        features_train, features_test, labels_train, labels_test = train_test_split(features, tweets['Label'], test_size=0.2, random_state=111)
        
        
        mnb = MultinomialNB(alpha=0.2)
        mnb.fit(features_train, labels_train)
        prediction = mnb.predict(features_test)
        conf_mat = metrics.confusion_matrix(labels_test, prediction)
        
        Pickler.saveMNB(vectorizer, mnb)
        
        
        #Confusion Matrix For MNB
        labels = ['HAM', 'SPAM']
        fig = plt.figure()
        ax = fig.add_subplot(111)
        cax = ax.matshow(conf_mat)
        plt.title('Confusion Matrix Of The MNB Classifier\n')
        fig.colorbar(cax)
        tick_marks = np.arange(len(labels))
        plt.xlabel('\nPredicted Label')
        plt.ylabel('True Label')
        plt.xticks(tick_marks, labels, rotation=0)
        plt.yticks(tick_marks, labels)
        s = [['TN','FP'], ['FN', 'TP']]
        for i in range(2):
            for j in range(2):
                plt.text(j,i, str(s[i][j])+" = "+str(conf_mat[i][j]))
        plt.show()
    
    def spam_or_ham(self, tweetText):
        vectorizer, mnb = Pickler.loadMNB()
        tweet = []
        tweet.append(tweetText)
        input_transformed = vectorizer.transform(tweet)
        prediction = mnb.predict(input_transformed)
        return prediction[0].item()
    
if __name__ == '__main__':
    tweet = 'HELLO THERE'
    spammer = SpamClassify()
    predict = spammer.spam_or_ham(tweet)
    print(predict)