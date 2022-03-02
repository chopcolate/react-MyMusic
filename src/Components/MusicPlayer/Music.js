import { FaHeart, FaRegHeart, FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom } from "react-icons/fa";
import { BsArrowRepeat, BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { GiConsoleController, GiMicrophone } from "react-icons/gi"
import { RiPlayListLine } from "react-icons/ri"
import { useRef, useEffect, useState } from 'react'
import './Music.css'

import { useDispatch, useSelector } from 'react-redux';

import Playlist from '../../Features/Playlist/Playlist'
import { play, pause, next, previous} from '../../actions/actions'


function Music() {

    const dispatch = useDispatch();
    const player = useSelector(state => state.player);
    
    const thumbnail = useRef();
    const music = useRef();
    const timeNow = useRef(); 
    const duration = useRef();
    const progress = useRef();
    const volume = useRef();
    const animation = useRef();
    const [current, setCurrent] = useState(player)
    // Animation
    useEffect(() => {
        animation.current = thumbnail.current.animate(
            {
                transform: 'rotate(360deg)'
            }, 
            {
                duration: 10000,
                iterations: Infinity
            }
        )
        
    }, [])
    
    // Music progress
    const handleTimeUpdate = () => {
        timeNow.current.innerHTML = new Date(music.current.currentTime* 1000).toISOString().substr(14, 5)
        progress.current.value = (music.current.currentTime/music.current.duration)*100 
    }
    const handleEnded = () => {
        dispatch(next())
    }

    useEffect(() => {
        current.isPlaying ? animation.current.play() : animation.current.pause()
    }, [current.isPlaying])

    useEffect(() => {
        if(current.isPlaying)
        {
            music.current.play()

            music.current.addEventListener('timeupdate', handleTimeUpdate)

            music.current.addEventListener('ended', handleEnded)

            music.current.onloadedmetadata = () => {
                duration.current.innerHTML = new Date(music.current.duration* 1000).toISOString().substr(14, 5)
            }
        }
        return () => {
            music.current.removeEventListener('timeupdate', handleTimeUpdate)
            music.current.removeEventListener('ended', handleEnded)
        }
        
    }, [current.nowPlaying])

    //Music Update State
    useEffect(() => {
        setCurrent(player)
    }, [player])
    
    const [toggleList, setToggleList] = useState(false)

    // Play event
    const handlePlay = () => {

        if (current.isPlaying)
        {
            music.current.pause()
            dispatch(pause())
        }
        else
        {
            music.current.play();
            dispatch(play())
        }
        
    }

    // Progress event
    const handleChangeProgress = (e) => {
        music.current.currentTime = (e.target.value/100)*music.current.duration
    }

    // Volume event
    const handleVolumeChange = (e) => {
        music.current.volume = e.target.value/100
    }


    // Control event
    const handleNext = () => {
        dispatch(next());
    }

    const handlePrevious = () => {
        dispatch(previous());
    }

    const handleRandom = (e) => {

    }

    const repeat = () => {
        music.current.play();
    }

    const handleLoop = (e) => {
        if (e.target.classList.contains('active'))
        {
            e.target.classList.remove('active')
            music.current.removeEventListener('ended', repeat)
            music.current.addEventListener('ended', handleEnded)
        }
        else
        {
            e.target.classList.add('active')
            music.current.removeEventListener('ended', handleEnded)
            music.current.addEventListener('ended', repeat);
        }
    }

    // Toggle playlist
    const handlePlaylist = (e) => {
        
        toggleList ? e.target.classList.remove('active') : e.target.classList.add('active')
        setToggleList(!toggleList)
    }

    


    return (
        <div className="music-player">
            <div className="song-info">
                <img ref={thumbnail} className="thumbnail" src={current.nowPlaying.img}></img>
                <div className="description">
                    <p className="name">{current.nowPlaying.name}</p>
                    <p className="author">{current.nowPlaying.artist}</p>
                </div>
                {/* <FaHeart className="fav" /> */}
                <FaRegHeart className="fav" />
            </div>

            <div className="control">
                <div className="button">
                    <FaRandom className="icon" onClick={handleRandom}/>
                    <FaStepBackward className="icon" onClick={handlePrevious}/>
                    {!current.isPlaying && <FaPlay className="icon icon-play" onClick={handlePlay}/>}
                    {current.isPlaying && <FaPause className="icon icon-play" onClick={handlePlay}/>}
                    <FaStepForward className="icon" onClick={handleNext}/>
                    <BsArrowRepeat className="icon" onClick={(e) => handleLoop(e)}/>
                </div>
                <div className="progress">
                    <span ref={timeNow}></span>
                    <input ref={progress} className="progress-bar" 
                    type="range" min="0" max="100" step="0.001" defaultValue="0"
                    onInput={(e) => handleChangeProgress(e)}></input>
                    <span ref={duration}></span>
                </div>
                
            </div>

            <div className="more">
                <GiMicrophone className="icon"/>
                <RiPlayListLine className="icon" onClick={(e) => handlePlaylist(e)}/>
                {toggleList && <Playlist />}
                <div className="volume">
                    <BsFillVolumeUpFill className="icon"/>
                    <input ref={volume} className="volume-bar" type="range" min="0" max="100" step="1" defaultValue="100" onChange={(e) => handleVolumeChange(e)}></input>
                </div>
                
            </div>
            <audio ref={music} src={current.nowPlaying.path} preload="metadata"></audio>
        </div>
    )
}

export default Music;