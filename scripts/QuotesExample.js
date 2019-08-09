// This is an example of the format required for the quotation data.
// The file must export an object with the keys "book" and "quotes".
// "books" holds an array of book names.
// "quotes" holds an array of quote objects, with the index of the book
// the quote comes from, the page and location, and the quote itself.

export const QuotesData = {
    books: [
        'Book one',
        'Book two',
        'Book three'
    ],
    quotes: [
        {
            book: 0,
            page: 5,
            location: '102-104',
            quote: 'Example quote number one, from Book one, page 5, location 102-104.'
        },
        {
            book: 2,
            page: 10,
            location: '151-153',
            quote: 'Example quote number two, from Book three, page 10, location 151-153.'
        },
    ],
};