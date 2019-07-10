## Generating Quotes

Since I don't have the copyrights to the quotes used, I'm not including them in the repository. However, I included my scripts that I wrote to generate the quotes data. Those are based on the highlight feature of the Amazon Kindle Paperwhite. If you have one of those, you can follow the following steps to convert your highlights into the required format.

For other quote sources, make sure to follow the format in the `QuotesExample.js` file.

### Using the scripts

- Select quotes from any number of books using the highlight feature of an Amazon Kindle Paperwhite.
- The highlights are stored in a "My Clippings.txt" file on the kindle. Extract that file and put it in the `scripts` directory. Remove the space in the filename.
- Run the script `ConvertClippingsToJson.js` with node, saving the result in a JSON file: `node ConvertClippingsToJson.js > Quotes.json`
    - The script requires some customization to work with the books you want to filter out. Make sure to read through the script and replace any hardcoded values appropriately.
- To order the quotes by book and page number, run the next script: `node QuotesOrderAscending.js > QuotesSorted.json`
- Now look through the resulting file and remove any quotes you don't want around.
- Finally, convert the JSON to an object literatal. I used [json-to-js](https://github.com/Dinoshauer/json-to-js). Add the export notation (see the example file) to make it a valid JS module.
- Now run that through a minifier. The resulting file must reside in the `web/` directory as `Quotes.min.js`.