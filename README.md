# Integration template

Use this project as a template for developing your own integrations

## Integration requirements
- a directory called routes which contains javascipt files that describe express routes
- a file called README.md which contains the necessary documentation to use it
- a route at '/setup' which will be use to set up the integration (authentication for example)

## The environment
You cant supply your own packages/env vars. 
The packages and environment vars preloaded in the supplied files are the same ones that are available to you.

The supplied server.js file can be used for testing, and serves as an example of how your routes will be loaded.

## routes
We will parse the files in the routes directory, and will only parse the routes from them.
Take a look in the server.js file for an example of how your routes will be loaded

## Document your integration
Supply a README.md file that will tell us everything about your integration

Please make sure it contains at least the following items:
- a general description of how your integration works / what it does
- an overview of all the routes in your integration
- the steps required in the setup process

## Submitting your integration

### For now
Put your trello card in the done column, and link the github repository the integration is in.

### Future
Go to https://xxxxxxxxx.com/submit and upload a zip file that fulfils the requirements.
Your integration will then be submitted for review by our team, 
and once accepted will be available in the 'store'.

from the store, logged in users will be able to set up your integration using your setup route, 
which will be accessible at https://xxxxxxxxx.com/plugin/your-integration-name/setup
and the integration will the be available to the user at https://xxxxxxx.com/plugin/your-integration-name