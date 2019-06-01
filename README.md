# Content Filter Using Sentiment & Subjectivity Analysis and Spam Detection
Content Filter Using Sentiment Analysis and ML Techniques. This project is the continuation of the [*Twitter Spam Detector*](https://github.com/berkerbugur/twitter-spam-detector) project and uses **Python** on the back-end and **Angular CLI** for front-end applications.

### Generic Workflow Of The Project

1. Main Spam-Detector model workflow (See [here](https://github.com/berkerbugur/twitter-spam-detector/blob/master/README.md))
2. Collecting live tweet
3. Passing live tweet to [**TextBlob**](https://textblob.readthedocs.io/en/dev/) to extract Sentiment and Subjectivity classifications
4. Passing live tweet to trained Spam Detection model to extract Spammicity classification
5. Create an API interface to pass data to front-end using REST architecture
6. Populate desired data as the API response for the Angular CLI app requests
7. Turn the script into a server applet using [**Flask**](http://flask.pocoo.org) and make it listen to the desired port for cross-application communication
8. Request data with Angular CLI app through HTTP
9. Populate view with received data
10. Filter the received content with the provided buttons

### Dependencies

***Because this project still relies on [Twitter Spam Detector](https://github.com/berkerbugur/twitter-spam-detector); you will need to provide a dataset in order to train the model. I cannot share my dataset(which I mined) publicly because of [Twitter ToS](https://developer.twitter.com/en/developer-terms/agreement). If you cannot find and require fitting data, please feel free to contact me, I can share the dataset if you don't mind how small it is.***

* First of all, you need to install Python and packages to script desired model creation and server-side capabilites, Angular CLI(v7) for view and projection/filtering of final data delivered by the custom API.

* For Python dependencies simply running the following script through your console environment in your Python VE should cover all of it;
```
pip install flask flask_restful flask_cors tweepy sklearn textblob pandas numpy
```

* After you've opened the Angular CLI app in your IDE, you can just run ```npm install``` for needed node modules.

### To Run The Project

- Provide your app credentials acquired through [Twitter Developer page](https://developer.twitter.com/en.html) where needed with respected values.
- Provide .csv formatted dataset in spam_classifier.py where expected
- Then simply run the ***main.py*** script through your IDE or if you're using a console environment just run ```python -tt main.py```
- And for your Angular CLI app, through your IDE terminal, simply run ```ng serve --hmr``` and navigate to **localhost:4200** on your browser.
- Enjoy getting rid of negative, spam or subjective content contaminating your Twitter feed!

## Possible Extensions

* NSFW Image Catcher(3rd Party)


