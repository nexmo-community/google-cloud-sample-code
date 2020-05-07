Vonage API / Google Cloud Examples
===

This repository contains code examples to use with Google Cloud.

## Getting Started

To get started - please make sure you have the following:

1. Vonage API (formerly Nexmo) [account](https://dashboard.nexmo.com/sign-in)
2. Google Cloud [account](https://console.cloud.google.com/)

## Get A Vonage Phone Number

All of the examples require a Vonage phone number and this can be achieved with the Nexmo CLI. Install the CLI by following [these instructions](https://github.com/Nexmo/nexmo-cli#installation).

### Buying a Number

You can purchase a phone number using the following command.  Replace the country code with your appropriate code. For more information on SMS Countries and Features go to <https://help.nexmo.com/hc/en-us/articles/115011451687-SMS-Numbers-Features-Overview>

```bash
nexmo number:buy --country_code US
```

## Current Examples

### SMS Translation with Google Cloud Translation API
SMS Messages sent through Vonage API will be sent to Google Cloud Translation API and the translation returned to the console.

[JavaScript](cloud-translation/JavaScript/sms-translation)

### SMS with Firebase Functions
SMS Messages sent through Vonage API will be sent to Google Cloud Translation API and the translation returned to the console.

[JavaScript](firebase/JavaScript/send-recieve-sms)

### SMS Sentiment Analysis with Google Natural Language API
SMS Messages sent through Vonage API will be sent to Google Natural Language API and a series of scores and tones returned to the console.

[JavaScript](natural-language/JavaScript/sms-sentiment)

### Google Cloud Speech Transcription
An audio stream is sent via websocket connection to your server and then relayed to the Google streaming interface. Speech recognition is performed and the text returned to the console.

[JavaScript](speech-to-text/JavaScript/voice-transcription)

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the project, let us know! You can either:

* Open an issue on this repository
* Tweet at us! We're [@VonageDev on Twitter](https://twitter.com/vonagedev)
* Or [join the Vonage Community Slack](https://developer.nexmo.com/community/slack)