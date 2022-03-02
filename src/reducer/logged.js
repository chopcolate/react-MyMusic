const initValue = {
    isLogged: false,
    username: '',
    userID: '',
}

const logged = (state = initValue, action) => {
    switch(action.type)
    {
        case 'LOG':
            return action.payload;
        default: 
            return state;
    }
}

export default logged;