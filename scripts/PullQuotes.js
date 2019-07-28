/** Get the quotes file from the URL in the environment variable and save it to the web directory */

const https = require('https');

const quotesFileUrl = process.env.QUOTES_FILE_URL;

const request = https.get(quotesFileUrl, response => {
    response.setEncoding('utf8');
    response.on('data', chunk => {
        process.stdout.write(chunk);
    })
});
