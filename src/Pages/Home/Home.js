import './Home.css'
import SlideShow from '../../Features/SlideShow/SlideShow'
import Artist from '../../Features/Artist/Artist'
import Genre from '../../Features/Genre/Genre'


function Home() {
    return (
        <div className="Content">
            <SlideShow />
            <Genre />
            <Artist />
        </div>
    )
}

export default Home