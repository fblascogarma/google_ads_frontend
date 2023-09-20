# Build a web app that is integrated with Google Ads

This project will teach you how to build a **frontend for your web app** that integrates with Google Ads using Google Ads API. To see the project for the backend, go [here](https://github.com/fblascogarma/google_ads_backend)

See [here](https://youtu.be/yVFZvJpLVxk) a 15-minute demo of the product you can have by cloning this repo and following the instructions. [Here](https://youtu.be/TCmxgpnEwC4) is a shorter product demo (6 minutes) that shows the flow for users without existing Google Ads accounts.

The main goal of this project is to **smooth and accelerate the integration process, while decreasing the cost of implementation & integration**. 

Companies can use my open-source app and the [technical guide](https://docs.google.com/document/d/10WyzDUNZTVHhenWgCopf3YyaRDsyoavc7aHuOAMJF6Y/edit?usp=sharing) I wrote as the **entry point to elements within the Google Ads API**. 

They can learn about what they can do with Google Ads API and **get a clear idea of how a finished solution could look like**. 

If this project helped you, please **give it a star**.

Give us your feedback [here](https://forms.gle/khdLQ7gDrU8i4p2j9) please. Any feature requests, bugs, satisfaction with the project, or others.

Testimonial from a company who used this project:
>"We looked at your app in great detail and learnt a lot from it. 
Your app worked like a charm and gave us a good sense of various components involved. 
The [document](https://docs.google.com/document/d/10WyzDUNZTVHhenWgCopf3YyaRDsyoavc7aHuOAMJF6Y/edit?usp=sharing) you provided was also very helpful.
Thank you for putting this together."

# Assumptions & Prerequisites

1. You already have a Google account. If you haven’t, go [here](https://accounts.google.com/signin).

1. You already have a Google Ads Manager account. If you haven’t, go [here](https://ads.google.com/home/tools/manager-accounts/).

1. You already have a basic/standard developer token access. If you haven’t, go [here](https://developers.google.com/google-ads/api/docs/first-call/dev-token). I have the basic access that gives me 15,000 operations / day (15k resources/day) and 1,000 requests / day, which is more than enough for this tutorial.

1. You know Python, JavaScript, full-stack web development, and APIs.

I’ll use Django (Python framework) for the backend, React (JavaScript framework/library) for the frontend, and Bootstrap for CSS.

# App Architecture

![app architecture](https://user-images.githubusercontent.com/62343770/163631847-e5e38b27-8258-459d-b58d-5f0f0c851a7a.png)


# Installation

See [here](https://youtu.be/WvP3vtc_o7Q) a video tutorial on how to set up this web app.

You need to [install NodeJS](https://nodejs.org/en/download/) if you haven't done this already.

Clone this repo and the repo for the [backend](https://github.com/fblascogarma/google_ads_backend). To create the backend, follow the steps on the README file on that repo.

Here are the instructions for the frontend after you cloned the repo.

1. Activate a virtual environment. 

> source NAME-OF-YOUR-PROJECT/bin/Activate

2. Navigate to the cloned folder, and install all dependencies.

> npm install

3. Start the server for the frontend.

> npm start

4. You are all set!

# Steps

You have to create a Google Cloud project and get the necessary credentials to consume Google's APIs.

These are the same steps outlined in the backend repo, so if you already followed those, you don't need to keep reading.

## Step 1 - Create a Google Cloud project

You need to register your app as a client of Google Ads. You will receive unique client credentials that you will use to authenticate that the one making the calls to the API is your app. 

Sign into your [Google Cloud Platform](https://cloud.google.com/) console, and go to your project. If you haven’t created one, follow the steps outlined below.

1. Go to [GCP](https://cloud.google.com/) and go to APIs & Services > Credentials. 
1. Create a project.
1. Click on Create credentials > OAuth client id
1. Following the steps, you will be prompted to choose the type of user. Choose ‘External’ as your project will support external users as it is usually the case with our partners.
1. Fill out the required fields: App name, User support email, and Email addresses in the Developer contact information section.
1. Click on ADD OR REMOVE SCOPES. The scopes that you will need to add depend on if you want to offer Google Business Information (aka Google My Business) or not (see the next sub-section called Google My Business (GMB)). You will definitely use the Google Ads API, so you can add it by copying and pasting the following: https://www.googleapis.com/auth/adwords
1. Add your google email address as a user.
1. Go again to Credentials > Create credentials > OAuth client id.
1. In Application type put ‘Web application’. As stated in the value proposition section, we are not going to create a service account because that is not usually the case for our partners.
1. In the Authorized JavaScript origins section and Authorized redirect URIs section, put "http://localhost:8080" in both. This is important because the OAuth flow will redirect you to that URI, and if you don’t include it in the project, you will get an error.
1. Download the json file with your credentials (your Client ID, Client Secret, redirect uris, etc.) and save it anywhere in your project.
1. Enable the APIs you are going to use (Google Ads API, My Business Business Information API, and My Business Account Management API) by navigating to APIs & Services > Dashboard, in your GCP project and click on ‘ENABLE APIS AND SERVICES’. Use the search bar to find them faster. The OAuth credentials will be the same as the ones you already created for the project. 

When you have your OAuth credentials, download the JSON file and save it to your backend folder. That will be the file that stores your client credentials that authenticates your app to Google’s services. 
That file contains information to link your app with your GCP project. 
Very important are the client id and client secret that tells Google which app project you are using.

You can use a YAML file to load your credentials, or you can use a dictionary to use it like I did. I recommend you store the values of client secret, client id, developer token, and login customer id in environment variables like I did.


### Google My Business

If your users have [Google My Business](https://developers.google.com/my-business/ref_overview) (now called Google Business Profile), it makes sense to also integrate those APIs to your app. To do so, you will need:
1. Get your project approved for GMB. This is a different approval process that you went through when getting a developer token for the Google Ads API.
1. Fill out [this form](https://docs.google.com/forms/d/1XTQc-QEjsE7YrgstyJxbFDnwmhUhBFFvpNJBw3VzuuE/viewform). Find more information about this [here](https://developers.google.com/my-business/content/prereqs). **Important**: You will get it approved for a specific project, so if you requested access to the GMB API for one project, and then you want to use it on another project, you need to request access to that one too.  
1. Go to the project on GCP and enable these two APIs like you did with the Google Ads API:
    1. My Business Business Information API
    1. My Business Account Management API
1. You are going to be able to use those APIs after you get approval from Google. 

Those two API for Google My Business are needed to get the business location id that you can use when creating a Smart Campaign. Check the Campaign Creation section for more information on this.

**Important:** if you are not using Google My Business (aka Business Profile), you need to make the following changes to the code repositories that you are going to clone:
1. In the backend, eliminate [L41](https://github.com/fblascogarma/google_ads_backend/blob/main/api/authenticate.py#L41) and [L75](https://github.com/fblascogarma/google_ads_backend/blob/main/api/authenticate.py#L75) from the [authenticate.py](https://github.com/fblascogarma/google_ads_backend/blob/main/api/authenticate.py). This will eliminate the scope during OAuth about Google My Business.
1. In the frontend, eliminate the useEffect to get data from that API that is in [L65 to L100](https://github.com/fblascogarma/google_ads_frontend/blob/main/src/components/CreateCampaign.js#L65-L100) in [CreateCampaign.js](https://github.com/fblascogarma/google_ads_frontend/blob/main/src/components/CreateCampaign.js).

### Verify your Google Cloud project

In parallel, you will need to verify your app. See [here](https://support.google.com/cloud/answer/7454865#verification) and [here](https://support.google.com/cloud/answer/9110914?hl=en) for helpful documentation. You can start this now or later on. It can take several weeks. The Cloud team will send you emails and you should try to answer quickly so they don’t block the process.

## Step 2 - Credentials configuration

Create environment variables to store all the credentials. Create the following environment variables.

1. GOOGLE_CLIENT_ID to store the client_id of the Google Cloud project.

1. GOOGLE_CLIENT_SECRET to store the client_secret of the Google Cloud project.

1. GOOGLE_DEVELOPER_TOKEN to store your developer token.

1. GOOGLE_CLIENT_SECRET_PATH to store the pack to the client_secret.json file you downloaded in the previous step.

More info about each of these below.

### Client secret, client ID, and login customer id

The client secret and client ID are in your client_secret.json file you downloaded from your GCP panel after creating the OAuth credentials for your app. And the login customer id is the customer id of your manager account on google ads (you have to put it without hyphens).

### Developer token

To copy paste your developer token, sign in your Manager account on Google Ads, go to Tools & Settings > Settings > API center. There you will see your developer token. 

### Refresh token

For the refresh token (see steps [here](https://developers.google.com/identity/protocols/oauth2#5.-refresh-the-access-token,-if-necessary.)), you need to know that the authorization sequence begins when your application redirects a browser to a Google URL; the URL includes query parameters that indicate the type of access being requested. 

Google handles the user authentication, session selection, and user consent. The result is an authorization code, which the application can exchange for an access token and a refresh token.

The application should store the refresh token for future use and use the access token to access a Google API. Once the access token expires, the application uses the refresh token to obtain a new one.

![oauth flow](https://user-images.githubusercontent.com/62343770/151631414-53d70b03-14db-4dfa-bde4-81b559ad6b43.png)


To learn more about the expiration of refresh tokens, go [here](https://developers.google.com/identity/protocols/oauth2#expiration).

To generate the refresh token, create a temporary [authenticate_in_web_application.py](https://github.com/googleads/google-ads-python/blob/master/examples/authentication/authenticate_in_web_application.py) file and make sure that the redirect URI is one that you have authorized in your GCP project. 

Make sure that the URL you are using in your code to redirect users is included in the authorized redirect URIs section in the GCP project. See image below.

<img width="880" alt="authorized_redirect_uris" src="https://user-images.githubusercontent.com/62343770/151631292-3aadfd3a-1a71-446a-9776-36e5b4ed6a80.png">


Also, make sure that you include the gmail account in the list of authorized test users in your GCP project. See image below.

<img width="706" alt="Authorize_test_users" src="https://user-images.githubusercontent.com/62343770/151631839-6c6e4605-84b9-4c21-8a50-4599d57897ac.png">

# Deploy to production

Although deploying to production is out of the scope of this project, I wanted to provide guidance on important things to consider, and deployment alternatives.

This section has two sub-sections (backend and frontend) that explains what you need to do to deploy Fran Ads to production. These changes are needed for the app to work correctly.

This section doesn't cover load balancers, queue systems, nor scaling architectures. That's on you to define how and what to use.

## Backend

There are three things to consider when thinking of deploying the backend to production.

1. The first thing you should do is turn off the debug mode. You don't want it running when your app is in production. Go to the [settings.py](https://github.com/fblascogarma/google_ads_backend/blob/main/backend/settings.py#L40) file, and change the 

> DEBUG = True 

to 

> DEBUG = False 

in line 40.

2. Set up error email alerts so you know when an exception has been raised. This is important to fix those issues that can appear. Include all email addresses that you want by adding the ADMINS setting in the [settings.py](https://github.com/fblascogarma/google_ads_backend/blob/main/backend/settings.py) file. Below an example.
> ADMINS = [
>     ('John', 'john@example.com'), 
>     ('Mary', 'mary@example.com')
> ]

3. Enable your server to send emails so you get the error email alerts. Depending on your arragement complexity, you need to add to the [settings.py](https://github.com/fblascogarma/google_ads_backend/blob/main/backend/settings.py) file all of these below.

> [EMAIL_HOST](https://docs.djangoproject.com/en/4.0/ref/settings/#:~:text=store%20output%20files.-,EMAIL_HOST,-%C2%B6)
> 
> [EMAIL_HOST_PASSWORD](https://docs.djangoproject.com/en/4.0/ref/settings/#:~:text=See%20also%20EMAIL_PORT.-,EMAIL_HOST_PASSWORD,-%C2%B6)
>
> [EMAIL_HOST_USER](https://docs.djangoproject.com/en/4.0/ref/settings/#:~:text=See%20also%20EMAIL_HOST_USER.-,EMAIL_HOST_USER,-%C2%B6)
>
> [EMAIL_PORT](https://docs.djangoproject.com/en/4.0/ref/settings/#:~:text=See%20also%20EMAIL_HOST_PASSWORD.-,EMAIL_PORT,-%C2%B6)
>
> [EMAIL_USE_TLS](https://docs.djangoproject.com/en/4.0/ref/settings/#:~:text=in%20UTC%20(False).-,EMAIL_USE_TLS,-%C2%B6)

[Here](https://django-book.readthedocs.io/en/latest/chapter12.html#using-different-settings-for-production) you will learn different ways to set up your settings files to keep your dev environment isolated from your prod environment.

## Frontend

First, you need to create a production build by running

> npm run build

This will create a **build** directory with a production build of your app. Inside the build/static directory will be your JavaScript and CSS files. Each filename inside of build/static will contain a unique hash of the file contents. This hash in the file name enables [long term caching techniques](https://create-react-app.dev/docs/production-build#static-file-caching).

The frontend is completely platform-agnostic, so you can use any server software of your choice. See [here](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing) how to serve the index.html for any unkown paths.

Finally, you can override where your app is hosted by adding the field homepage in your [package.json](https://github.com/fblascogarma/google_ads_frontend/blob/main/package.json) file. See example below.

> "homepage": "http://mywebsite.com/relativepath"

Check out the links provided below for each Cloud provider.

1. [Google Cloud](https://cloud.google.com/community/tutorials/deploy-react-nginx-cloud-run)
2. [AWS Amplify](https://create-react-app.dev/docs/deployment/#aws-amplify)
3. [Azure](https://create-react-app.dev/docs/deployment/#azure)
4. [Firebase](https://create-react-app.dev/docs/deployment/#firebase)
5. [Heroku](https://create-react-app.dev/docs/deployment/#heroku)
6. [Netlify](https://create-react-app.dev/docs/deployment/#netlify)
7. [Vercel](https://create-react-app.dev/docs/deployment/#vercel)

# Final remarks

This is just to get you started so you can learn about making API calls to Google Ads API and Google My Business API. 

By cloning this project and the frontend that is in a separate repo in my GitHub profile, you are ready to start exploring what you can do with Google Ads API.

#### **Happy hacking!**