/**
 * Return a random index within the length of the passed array.
 */
export const randomArrayIndex = ({length}) => Math.floor(Math.random() * length);

/**
 * Return a random index within the length of the passed array, excluding all the indexes passed as the second argument.
 * @param {array} arr The array to get an index from.
 * @param {array} exclude An array of indexes to exclude.
 */
export const randomArrayIndexExcluding = (arr, exclude = []) => {
    const allPossibleIndexes = [...Array(arr.length).keys()].filter(
        curr => !(exclude.includes(curr)
    ));
    if (allPossibleIndexes.length === 0) {
        throw "Can't get a random array index because all are excluded!";
    }
    return randomArrayElement(allPossibleIndexes);
}

/**
 * Return a random element from the passed array.
 */
export const randomArrayElement = arr => arr[randomArrayIndex(arr)];

/**
 * Return a random element from the passed array, exluding all the elements with the indexes passed to the function.
 * @param {array} arr The array to get an element from.
 * @param {array} exclude An array of indexes to exclude.
 */
export const randomArrayElementExcluding = (arr, exclude = []) => arr[randomArrayIndexExcluding(arr, exclude)];

/**
 * Retrieve a number of (non-unique) elements from the passed array.
 * @param {array} arr The array to retrieve elements from.
 * @param {int} amount The amount of elements to retrieve.
 */
export const randomArrayElements = (arr, amount) => [...Array(amount)].map(() => randomArrayElement(quotes));

/**
 * Retrieve a number of random elements from the passed array.
 * @param {array} arr The array to retrieve elements from.
 * @param {int} amount The amounts of elements to retrieve.
 */
export const uniqueRandomArrayElements = (arr, amount) => {
    if (amount > arr.length) {
        throw `Too many elements requested! Requested ${amount} elements, but the array has only ${arr.length}`;
    }
    return [...Array(amount)].reduce((acc, curr) => {
        const nextIndex = randomArrayIndexExcluding(arr, acc.indexes);
        acc.elements.push(arr[nextIndex]);
        acc.indexes.push(nextIndex);
        return acc;
    }, { elements: [], indexes: [] }).elements;
}

/**
 * Get an array containing a number of groups (array) which in turn contain the
 * specified number of elements from the passed array.
 * @param {array} arr The array to retrieve items from.
 * @param {int} groupsAmount The amount of groups to create.
 * @param {int} perGroupAmount The amount of array elements per group.
 */
export const randomArrayElementGroups = (arr, groupsAmount, perGroupAmount) => [...Array(groupsAmount)].map(
    () => randomArrayElement(arr, perGroupAmount)
);

/**
 * Get an array containing a number of groups (array) which in turn contain the
 * specified number of elements from the passed array. Elements are unique across
 * all groups.
 * @param {array} arr The array to retrieve items from.
 * @param {int} groupsAmount The amount of groups to create.
 * @param {int} perGroupAmount The amount of array elements per group.
 */
export const uniqueRandomArrayElementGroups = (arr, groupsAmount, perGroupAmount) => {
    return uniqueRandomArrayElements(arr, groupsAmount * perGroupAmount).reduce(
        (acc, curr) => {
            if (acc.length === 0 || acc[acc.length - 1].length === perGroupAmount) {
                acc.push([curr]);
            } else {
                acc[acc.length - 1].push(curr);
            }
            return acc;
        },
        []
    )
};
