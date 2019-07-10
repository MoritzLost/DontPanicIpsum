const fs = require('fs');
const path = require('path');
const util = require('util');
const os = require('os');
const ScriptHelpers = require('./ScriptHelpers.js');


// read quotes from a file in the kindle clippings format
// drop the clippings file from the kindle in the folder where the script is
let clippings;
try {
    clippings = fs.readFileSync(
        path.join(__dirname, "MyClippings.txt"),
        'utf8',
    );
} catch (e) {
    console.log(e);
    process.exit(1);
}

// split on the kindle clippings seperator
let quotes = clippings.split(/[\r\n]+==========[\r\n]+/g);

// extract information
quotes = quotes.map((current) => {
    const [book, details, quote] = current.split(/[\r\n]+/g);
    // this will be filtered out in the next part
    if (
        typeof book === 'undefined'
        || typeof details === 'undefined'
        || typeof quote === 'undefined'
    ) {
        return null;
    }
    // extract the page, if present
    const page_match = details.match(/page (\d+)/);
    const page = page_match === null
        ? null
        : Number(page_match[1]);
    // extract the location
    const location_match = details.match(/location (\d+\-\d+)/);
    const location = location_match === null
        ? null
        : location_match[1];
    return {book, page, location, quote};
});
// filter out all the duds (e.g. bookmarks, they don't have a quote)
quotes = quotes.filter((quote => quote !== null));

// set of all quoted books, we will use this to filter out the ones we want
let all_books = ScriptHelpers.allBooksInSet(quotes);

// log the result of all_books to find the titles we want
// note this is a regex, because my clippings file contained two versions of the first title
const allowed_books = [
    "^The Ultimate Hitchhiker's Guide to the Galaxy: Five Novels in One Outrageous Volume",
    "^And Another Thing",
];

// filter out all non-relevant books
quotes = quotes.filter(quote => {
    return allowed_books.some(book => {
        const regex = new RegExp(book);
        return quote.book.match(regex);
    });
});

// unfortunaly, my edition of the hitchhikers guide is an omnibus edition, so one
// volume containing all five novels (plus a short story). for my quotes list i
// want the "real" titles, so i map that using a text regexp for the title and
// mappings between page ranges and titles
const book_mappings = [
    {
        test: "^The Ultimate Hitchhiker's Guide to the Galaxy: Five Novels in One Outrageous Volume",
        booksByPages: [
            {
                title: "The Hitchhiker's Guide to the Galaxy",
                start: 0,
                end: 144,
            },
            {
                title: "The Restaurant at the End of the Universe",
                start: 145,
                end: 310,
            },
            {
                title: "Life, the Universe and Everything",
                start: 311,
                end: 470,
            },
            {
                title: "So Long, and Thanks for All the Fish",
                start: 471,
                end: 612,
            },
            {
                title: "Young Zaphod Plays It Safe",
                start: 613,
                end: 626,
            },
            {
                title: "Mostly Harmless",
                start: 626,
                end: 815,
            }
        ]
    }
];
quotes = quotes.map(quote => {
    return book_mappings.reduce((accum, curr) => {
        if (new RegExp(curr.test).test(accum.book)) {
            accum.book = curr.booksByPages.find(bookRange => bookRange.start <= accum.page && accum.page <= bookRange.end).title;
        }
        return accum;
    }, quote);
})

// log this to check if the mapping was successful
// let quoteCountByBook = ScriptHelpers.quoteCountByBook(quotes);

let books = [];
quotes = quotes.map(quote => {
    if (books.includes(quote.book)) {
        quote.book = books.indexOf(quote.book);
    } else {
        const length = books.push(quote.book);
        quote.book = length - 1;
    }
    return quote;
});

// final data to export includes the book titles and all quotes
const export_data = {
    quotes,
    books,
};

// output the final quotes list as a json string
process.stdout.write(JSON.stringify(export_data, null, 4));