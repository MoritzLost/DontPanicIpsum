function allBooksInSet(quotes) {
    return quotes.reduce((acc, q) => {
        if (!acc.has(q.book)) {
            acc.add(q.book);
        };
        return acc;
    }, new Set());
}

function quoteCountByBook(quotes) {
    return quotes.reduce((acc, q) => {
        let book = acc.findIndex(curr => curr.title === q.book);
        if (book >= 0) {
            acc[book].count++;
        } else {
            acc.push({
                title: q.book,
                count: 1,
            })
        }
        return acc;
    }, []);
}

module.exports = {
    allBooksInSet,
    quoteCountByBook,
};