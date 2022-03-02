
const initValue = {
    isPlaying: false,
    nowPlaying: {},
    playlist: []
}

const player = (state = initValue, action) => {
    switch (action.type) {
        case 'PLAY':
            if (action.payload) {
                return {
                    isPlaying: true,
                    nowPlaying: action.payload.nowPlaying,
                    playlist: action.payload.playlist
                }
            }
            return {
                isPlaying: true,
                nowPlaying: state.nowPlaying,
                playlist: state.playlist
            }

        case 'PAUSE':
            return {
                isPlaying: false,
                nowPlaying: state.nowPlaying,
                playlist: state.playlist
            }

        case 'NEXT':
            {
                let newPlaying;
                if (state.nowPlaying.index == state.playlist.length - 1) {
                    newPlaying = state.playlist[0]
                    newPlaying.index = 0
                }
                else {
                    newPlaying = state.playlist[state.nowPlaying.index + 1]
                    newPlaying.index = state.nowPlaying.index + 1
                }
                return {
                    isPlaying: true,
                    nowPlaying: newPlaying,
                    playlist: state.playlist
                }
            }

        case 'PREVIOUS':
            {
                let newPlaying;
                if (state.nowPlaying.index == 0) {
                    newPlaying = state.playlist[state.playlist.length - 1]
                    newPlaying.index = state.playlist.length - 1
                }
                else {
                    newPlaying = state.playlist[state.nowPlaying.index - 1]
                    newPlaying.index = state.nowPlaying.index - 1
                }
                console.log(newPlaying)
                return {
                    isPlaying: true,
                    nowPlaying: newPlaying,
                    playlist: state.playlist
                }
            }
        default:
            return state;
    }
}


export default player;