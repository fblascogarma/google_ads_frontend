# Build a web app that is integrated with Google Ads (this is the frontend)

This project will teach you how to build a frontend for your web app that integrates with Google Ads using Google Ads API. To see the project for the backend, go [here](https://github.com/fblascogarma/google_ads_backend)

I have [this repo](https://github.com/fblascogarma/backend_starter) to help you get started with a basic backend using Django, and [this repo](https://github.com/fblascogarma/frontend_starter) to help you get started with a basic frontend using React. We will build from these two repos.

If this project helped you, please give it a star, and if you have suggestions, they are more than welcome. Thank you!

# Assumptions & Prerequisites

1) You already have a Google account. If you haven’t, go [here](https://accounts.google.com/signin).

2) You already have a Google Ads Manager account. If you haven’t, go [here](https://ads.google.com/home/tools/manager-accounts/).

3) You already have a basic/standard developer token access. If you haven’t, go [here](https://developers.google.com/google-ads/api/docs/first-call/dev-token). I have the basic access that gives me 15,000 operations / day (15k resources/day) and 1,000 requests / day, which is more than enough for this tutorial.

4) You already have a web app functioning where you can develop this Google Ads solution. If you haven't, use my [backend starter](https://github.com/fblascogarma/backend_starter) and my [frontend starter](https://github.com/fblascogarma/frontend_starter).

5) You know Python, JavaScript, full-stack web development, and APIs.

I’ll use Django (Python framework) for the backend, React (JavaScript framework/library) for the frontend, and Bootstrap for CSS.

# Steps (WIP)

I will complete this later.

1) Create a project in GCP and get OAuth credentials

You need to register your app as a client of Google Ads. You will receive unique client credentials that you will use to authenticate that the one making the calls to the API is your app. 

Sign into your [Google Cloud Platform](https://cloud.google.com/) console, and go to your project. If you haven’t created one still, do it. Follow the steps. 

When you have your OAuth credentials, download the JSON file and save it to your backend folder. That will be the file that stores your client credentials that authenticates your app to Google’s services. 

In my case, I created an authentication folder under my google_ads folder where I saved that JSON file. That file contains information to link your app with your GCP project. 

Very important are the client id and client secret that tells Google which app project you are using.

You can use a YAML file to load your credentials, or you can use a dictionary to use it. First, I use a YAML file to test the API, but when I started building for the app, I used a dictionary. 

I recommend you store the values of client secret, client id, developer token, and login customer id in environment variables like I did.

2) Install client library

Install the client library in your preferred language and set up the configurations. In my case, I love Python so I’m going to install Python’s client library.

Go to your backend folder where you want to install the library, make sure you have activated your virtual environment, and type

python -m pip install google-ads
