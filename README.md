# Build a web app that is integrated with Google Ads (this is the frontend)

This project will teach you how to build a frontend for your web app that integrates with Google Ads using Google Ads API. To see the project for the backend, go [here](https://github.com/fblascogarma/google_ads_backend)

See [here](https://youtu.be/yVFZvJpLVxk) a 15-minute demo of the product you can have by cloning this repo and following the instructions.

The main goal of this project is to **smooth and accelerate the integration process, while decreasing the cost of implementation & integration**. 
Companies can use my open-source app and the [technical guide](https://docs.google.com/document/d/1Tz0NRHokAFjd-6A0KM9KeLnEvt9XFM4l1PfI9MCE6v8/edit?usp=sharing) I wrote as the **entry point to elements within the Google Ads API**. They can learn about what they can do with Google Ads API and **get a clear idea of how a finished solution could look like**. 

If this project helped you, please give it a star, and if you have suggestions, they are more than welcome. Thank you!

# Assumptions & Prerequisites

1) You already have a Google account. If you haven’t, go [here](https://accounts.google.com/signin).

2) You already have a Google Ads Manager account. If you haven’t, go [here](https://ads.google.com/home/tools/manager-accounts/).

3) You already have a basic/standard developer token access. If you haven’t, go [here](https://developers.google.com/google-ads/api/docs/first-call/dev-token). I have the basic access that gives me 15,000 operations / day (15k resources/day) and 1,000 requests / day, which is more than enough for this tutorial.

4) You already have a web app functioning where you can develop this Google Ads solution. If you haven't, use my [backend starter](https://github.com/fblascogarma/backend_starter) and my [frontend starter](https://github.com/fblascogarma/frontend_starter).

5) You know Python, JavaScript, full-stack web development, and APIs.

I’ll use Django (Python framework) for the backend, React (JavaScript framework/library) for the frontend, and Bootstrap for CSS.

# App Architecture

![app architecture](https://user-images.githubusercontent.com/62343770/151630725-253d241a-6239-405f-9355-cf5dbfd381f9.png)


# Installation

You need to [install NodeJS](https://nodejs.org/en/download/) if you haven't done this already.

These are the libraries you will need to install for this project (frontend). I'm specifying the versions that I use in my app in case there were some new updates that could break things.

React:  
> npx create-react-app frontend

React Router:
> npm i react-router-dom@5.2.0

React Cookie:
> npm i react-cookie@4.0.3

React Bootstrap:
> npm i react-bootstrap@2.0.2

# Steps

Check out the [technical guide](https://docs.google.com/document/d/1Tz0NRHokAFjd-6A0KM9KeLnEvt9XFM4l1PfI9MCE6v8/edit?usp=sharing) I wrote that explains every step you need to take. You will see three sections.

Section 1 - Before Starting

Section 2 - Configuration & Installation

Section 3 - Build the Web App

Here I will go over the first step of Section 2 - Configuration & Installation. The rest of the steps are outlined in the backend repo README file because are things you need to do in your backend.

## Create a Google Cloud project

You need to register your app as a client of Google Ads. You will receive unique client credentials that you will use to authenticate that the one making the calls to the API is your app. 

Sign into your [Google Cloud Platform](https://cloud.google.com/) console, and go to your project. If you haven’t created one, do it by following the steps outlined there. 

When you have your OAuth credentials, download the JSON file and save it to your backend folder. That will be the file that stores your client credentials that authenticates your app to Google’s services. 
That file contains information to link your app with your GCP project. 
Very important are the client id and client secret that tells Google which app project you are using.

You can use a YAML file to load your credentials, or you can use a dictionary to use it. First, I use a YAML file to test the API, but when I started building for the app, I used a dictionary. I recommend you store the values of client secret, client id, developer token, and login customer id in environment variables like I did.

In parallel, you will need to verify your app. See [here](https://support.google.com/cloud/answer/7454865#verification) and [here](https://support.google.com/cloud/answer/9110914?hl=en) for helpful documentation. You can start this now or later on. It can take several weeks. The Cloud team will send you emails and you should try to answer quickly so they don’t block the process.