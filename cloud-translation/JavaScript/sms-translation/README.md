# SMS Translation with Google Cloud Translation API

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://nexmo.dev/google-nexmo-sms-translate-heroku)

This example uses Google Cloud Translation API to translate SMS messages to the language of your choice..

SMS Messages sent through Nexmo will be sent to Google Cloud Translation API and the translation returned to the console.

## Google Cloud Translation API

+ Reference: [https://cloud.google.com/translate/docs/quickstarts](https://cloud.google.com/translate/docs/quickstarts)
+ API Docs: [https://cloud.google.com/translate/docs/reference/rest/](https://cloud.google.com/translate/docs/reference/rest/)
+ GitHub: [https://github.com/googleapis/nodejs-language](https://github.com/googleapis/nodejs-language)

Enable the [Google Cloud Translation API](https://console.cloud.google.com/apis/library/translate.googleapis.com?q=translate&id=c22f20ba-6a29-40ae-9084-8bc264a97fc2) and create a service user with the `Project > Owner` role. Download the `google_creds.json` file for the service user. More information can be found here -> [https://cloud.google.com/translate/docs/quickstart-client-libraries](https://cloud.google.com/translate/docs/quickstart-client-libraries)

## Running the App

This sample app uses a `.env` file to provide the API key and URL.

Copy the provided `.env.example` file to a new file called `.env`:

```
cp .env.example > .env
```

Then update the values with the local file path of the `google_creds.json` file, and then save.

```
GOOGLE_APPLICATION_CREDENTIALS=
TARGET_LANGUAGE='en'
```

Also, expose the application to the internet using tools like [ngrok](https://ngrok.com/). To see how, [check out this guide](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/).

### Using Docker

To run the app using Docker, run the following command in a terminal:

```
docker-compose up
```

This will create a new image with all the dependencies and run it at http://localhost:3000.

### Using Node

To run the app using node, run the following command in a terminal:

```
npm install && node index.js
```

This will install all the dependencies and run it at http://localhost:3000.

## Linking the app to Nexmo

Update your virtual number with the URL of the hosted or local server.

```
nexmo link:sms phone_number https://my-hostname/message
```

## Try it out

With the example Node application running in the terminal, send various SMS messages to the virtual number.  The terminal will output the response from Google Natural Language API.

## Extend
This app prints out to the console. For integration with an application, extend the `translateText` function to suit your needs.
