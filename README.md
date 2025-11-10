# Don't Panic Ipsum | A hitchhiker's guide to placeholder text

You can use this dummy text generator at <https://dontpanicipsum.herebedragons.world/>. Follow the instructions below to deploy a version of this app or develop your own!

## Deployment

First you need to get a list of quotes, which aren't included in this repository for legal reasons. Then you can deploy either manually or using Netlify.

### Generating Quotes

Since I don't have the copyrights to the quotes used, I'm not including them in the repository. However, I included my scripts that I wrote to generate the quotes data. Those are based on the highlight feature of the Amazon Kindle Paperwhite. If you have one of those, you can follow the following steps to convert your highlights into the required format.

For other quote sources, make sure to follow the format from the example file (`scripts/QuotesExample.js`).

#### Using the scripts

- Select quotes from any number of books using the highlight feature of an Amazon Kindle Paperwhite.
- The highlights are stored in a "My Clippings.txt" file on the kindle. Extract that file and put it in the `scripts` directory. Remove the space in the filename.
- Run the script `ConvertClippingsToJson.js` with node, saving the result in a JSON file: `node ConvertClippingsToJson.js > Quotes.json`
    - The script requires some customization to work with the books you want to filter out. Make sure to read through the script and replace any hardcoded values appropriately.
- To order the quotes by book and page number, run the next script: `node QuotesOrderAscending.js > QuotesSorted.json`
- Now look through the resulting file and remove any quotes you don't want around.
- Finally, convert the JSON to an object literatal. I used [json-to-js](https://github.com/Dinoshauer/json-to-js). Add the export notation (see the example file) to make it a valid JS module.
- Now run that through a minifier. The resulting file must reside in the `web/` directory as `Quotes.min.js` (you can do this manually or through an automated process during the CD pipeline, see Netlify Deployment).

### Manual Deployment

Just put your final quotes data file (see Generating Quotes) in the web folder. Run `npm run compile` to compile the SCSS stylesheet to CSS. Then simply upload the `web/` directory to your webroot. Done!

### Netlify Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/bd56e5e1-14c5-4c2e-8f7b-bf76b563d9df/deploy-status)](https://app.netlify.com/sites/dreamy-fermi-3e44ef/deploys)

The live site is deployed with netlify, the build settings are included in the `netlify.toml` file. The only thing you need to add through the netlify site settings is an environment variable pointing to the URL of a text file containing the exported quotes data (see Generating Quotes).

The environment variable needs to be called `QUOTES_FILE_URL`. You can use a secret gist; make sure to set the environment variable to the URL of the raw text file, not the gist itself.

During the build, netlify will run the npm script `git pull`, which will fetch the file the environment variable is pointing to and put it in the web directory as `Quotes.min.js`.

## Development

There is no compile step for this project, as it's based on native ES6 modules. The web root is the `web/` directory. However, if you just open up the `index.html` in the browser, the browser may refuse to load the modules because it's not loaded via https. So we still need a local development server. http-server is included as a dev-dependency. First, generate a certificate to use for SSL:

    openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

Then, simply start the development server:

    npm run start
