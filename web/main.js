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
const quotesToText = quotes => quotes.reduce((acc, curr) => `${acc}${acc.length ? ' ' : ''}${curr.quote}`, '');

/**
 * Convert a group of quotes arrays to paragraphs of text seperated by two newlines.
 * @param {array} quotesGroup An array containing multiple arrays that contain a number of quotes each.
 */
const quotesGroupsToText = quotesGroup => quotesGroup.reduce((acc, curr) => `${acc}${acc.length ? "\n\n" : ''}${quotesToText(curr)}`, '');


/**
 * MAIN PAGE LOGIC
 */

const form = document.getElementById('settings');
const refreshQuotesDisplay = () => {
    const paragraphs = Number(form.querySelector('[name="paragraphs"]').value);
    const quotesPerParagraph = Number(form.querySelector('[name="quotesPerParagraph"]').value);
    const requestedQuotesTotal = paragraphs * quotesPerParagraph;
    const selectedQuotes = requestedQuotesTotal > QuotesData.quotes.length
        ? randomArrayElementGroups(QuotesData.quotes, paragraphs, quotesPerParagraph)
        : uniqueRandomArrayElementGroups(QuotesData.quotes, paragraphs, quotesPerParagraph);
    const quotesText = quotesGroupsToText(selectedQuotes);
    document.getElementById('output').value = quotesText;
}

// render the quotes on initial page load
refreshQuotesDisplay();

// refresh quotes every time a setting is changed
form.addEventListener('change', refreshQuotesDisplay);
