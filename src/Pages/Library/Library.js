import Favorite from '../../Features/Library/Favorite'
import { useSelector } from 'react-redux'

function Library() {

    const logged = useSelector(state => state.logged);

    return (
        <div className="Content">
            <h1>Your Favorite Songs</h1>
            {!logged.isLogged && <h3>Login to use this feature</h3>}
            {logged.isLogged && <Favorite />}
        </div>
    )
}

export default Library