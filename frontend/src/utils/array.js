export const addItemToArray = (array, item) => {
    return [ ...array, item ];
}

export const updateItemInArray = (array, item, index) => {
    return [ ...array.slice(0, index), item, ...array.slice(index+1, array.length) ]
}

export const removeItemFromArray = (array, index) => {
    return [ ...array.slice(0, index), ...array.slice(index+1, array.length) ]
}