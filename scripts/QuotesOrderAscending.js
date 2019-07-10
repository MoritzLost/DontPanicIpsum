// this will sort the quotes
// - first by the order in which the books appear in the array
// - second by the page

const path = require('path');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(
    path.join(__dirname, "Quotes.json"),
    'utf8',
));

data.quotes.sort((a, b) => {
    // if the quotes are from different books, we sort by book index
    if (a.book !== b.book) {
        return a.book - b.book;
    }
    // otherwise, sort by page number
    return a.page - b.page;
});

process.stdout.write(JSON.stringify(data, null, 4));