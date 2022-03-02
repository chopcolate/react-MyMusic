
import { useSelector, useDispatch } from 'react-redux'
import { play } from'../../actions/actions'
import { useState, useEffect } from 'react'
import './Playlist.css'

function Playlist() {

    const dispatch = useDispatch();
    const player = useSelector(state => state.player)

    const [current, setCurrent] = useState(player.playlist)

    const handlePlaylistClick = (item, index) => {
        dispatch(play({
            nowPlaying: {
                ...item,
                index: index
            },
            playlist: current
        }))
    }

    useEffect(() => {
        setCurrent(player.playlist)
    }, [player])

    return (
        <div className="player-playlist">
            <ul>
                {
                    current.map((item, index) => {
                        return (
                            <li key={index} onClick={() => handlePlaylistClick(item, index)}>
                                <img src={item.img}></img>
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.artist}</p>
                                </div>
                                
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Playlist;