# Stratios 

<img src="https://github.com/eduardhojbota/stratios/raw/master/logo.png" style="display: block; margin: 0 auto;"/>

## Abstract

My graduation thesis is titled “Analysis of social media discussions” and the scope is to analyze social media discussions using readability tests and sentiment analysis in order to evaluate the quality of a discussion based on user preferences.
By evaluating the discussions and studding the results the user can form an opinion about the discussion before reading it.
This can help users to filter discussions which they don’t consider relevant, are negative or don’t reflect the preferred readability results.

The readability tests used in the thesis are:
  - Automated readability index
  - Coleman–Liau index
  - Dale–Chall readability formula
  - Flesch–Kincaid readability tests
  - Flesch reading ease
  - Flesch–Kincaid grade level
  - Gunning fog index
  - SMOG
  - Spache readability formula

Accumulated, the tests generated a 93.86% success rate compared to readable.io.

The AFINN lexicon was used for sentiment analysis and it works by assigning a value to the words in the lexicon between the [-5,5] range. The values between [-5,0) represent negative polarity and the values between (0, 5] represent positive polarity.

Besides readability tests and sentiment analysis, activity of an user or thread has also being analyzed by counting the number of comments a user participated with or a thread has along the timespan of the creation of the user or thread.

The development of the thesis has been achieved by creating a system composed of two applications, a server and a client. The server is a NodeJS express server which, on request from the client, grabs data from the Reddit server, analyses it and sends the results to the client. The client is a cross-platform web extensions which on accessing a thread or a user page on Reddit requests analysis information to the server, processes it based on user preferences and displays it in the extension interface – either the extension badge or extension popup.

Analysis is configured client side in order to allow the user to have a subjective analysis. The user can activate or deactivate analysis modules and readability tests, set the readability preferred grade and range, set the sentiment threshold and set the threshold for user activity analysis and thread activity analysis.
