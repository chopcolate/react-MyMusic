const initValue = "";


const keySearch = (state = initValue, action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.payload;
        default:
            return state;
    }
}

export default keySearch;