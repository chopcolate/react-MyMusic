

export const play = (payload = null) => {
    return {
        type: 'PLAY',
        payload: payload
    }
}

export const pause = () => {
    return {
        type: 'PAUSE'
    }
}

export const next = () => {
    return {
        type: 'NEXT'
    }
}

export const previous = () => {
    return {
        type: 'PREVIOUS'
    }
}

export const log = (payload) => {
    return {
        type: 'LOG',
        payload: payload
    }
}

export const search = (payload) => {
    return {
        type: 'SEARCH',
        payload: payload
    }
}