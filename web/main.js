import { QuotesData } from "./Quotes.min.js";
import {
    randomArrayElementGroups,
    uniqueRandomArrayElementGroups,
} from "./ArrayHelpers.js";


/**
 * QUOTES DISPLAY HELPERS
 */

/**
 * Convert an array of quotes objects to plaintext.
 * @param {array} quotes An array containing quote Objects. 
 */
const quotesToText = (quotes, prefix = '', suffix = '') => {
    return `${prefix}${quotes.reduce((acc, curr) => {
        return `${acc}${acc.length ? ' ' : ''}${curr.quote}`;
    }, '')}${suffix}`;
};

/**
 * Convert a group of quotes arrays to paragraphs of text seperated by two newlines.
 * @param {array} quotesGroup An array containing multiple arrays that contain a number of quotes each.
 */
const quotesGroupsToText = (quotesGroup, groupPrefix = '', groupSuffix = '') => {
    return quotesGroup.reduce((acc, curr) => {
        return `${acc}${acc.length ? "\n\n" : ''}${quotesToText(curr, groupPrefix, groupSuffix)}`
    }, '');
};

const findQuoteByText = (quotes, text) => quotes.find(q => q.quote === text);

/**
 * MAIN PAGE LOGIC
 */

const form = document.getElementById('settings');
const refreshQuotesDisplay = () => {
    // select the available quotes from all quotes and
    // filter out all quotes from the spinoff book if necessary
    const includeSpinoff = form.querySelector('[name="includeSpinoff"]').checked;
    let availableQuotes = includeSpinoff
        ? QuotesData.quotes
        : QuotesData.quotes.filter(q => q.book !== 6);

    const maximumQuoteLength = Number(form.querySelector('[name="maximumQuoteLength"]').value);
    const lowerBoundOfMaximum = Number(form.querySelector('[name="maximumQuoteLength"]').min);
    if (maximumQuoteLength >= lowerBoundOfMaximum) {
        availableQuotes = availableQuotes.filter(q => q.quote.length <= maximumQuoteLength);
    }

    // number of paragraphs and quotes per paragraph
    const paragraphs = Number(form.querySelector('[name="paragraphs"]').value);
    const quotesPerParagraph = Number(form.querySelector('[name="quotesPerParagraph"]').value);
    const requestedQuotesTotal = paragraphs * quotesPerParagraph;
    // randomly select the groups of quotes required for the requested amount of paragraphs
    const selectedQuotes = requestedQuotesTotal > availableQuotes.length
        // if there are less quotes than requested, duplicates are possible
        ? randomArrayElementGroups(availableQuotes, paragraphs, quotesPerParagraph)
        // if there are more quotes than requested, avoid duplicates
        : uniqueRandomArrayElementGroups(availableQuotes, paragraphs, quotesPerParagraph);
    // if a specific quote is requested as the start, replace the first quote
    const selectedStart = form.querySelector('[name="start"]').value;
    if (selectedStart !== 'random') {
        const startQuote = findQuoteByText(QuotesData.quotes, selectedStart);
        selectedQuotes[0].splice(0, 1, startQuote);
    }
    // get the tags to wrap each paragraph in, if any
    const wrapElement = form.querySelector('[name="wrap"]').value;
    const wrapStart = wrapElement ? `<${wrapElement}>` : '';
    const wrapEnd = wrapElement ? `</${wrapElement}>` : '';
    // convert the quotes to the final text and display it
    const quotesText = quotesGroupsToText(selectedQuotes, wrapStart, wrapEnd);
    document.getElementById('output').value = quotesText;
}

// render the quotes on initial page load
refreshQuotesDisplay();

// refresh the view every time a setting is changed
form.addEventListener('change', refreshQuotesDisplay);
// prevent reloading the page upon submit, refreshing the view instead
form.addEventListener('submit', e => {
    e.preventDefault();
    refreshQuotesDisplay();
});
