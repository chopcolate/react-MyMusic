import { useSelector, useDispatch } from 'react-redux';
import { play } from '../../../actions/actions'
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where, orderBy, getFirestore, startAt, endAt } from 'firebase/firestore'
import './SearchResult.css'

const SearchResult = () => {

    const dispatch = useDispatch();
    const db = getFirestore();
    const keyword = useSelector(state => state.keySearch)
    const [results, setResults] = useState([])

    const handleClick = (item, index) => {
        dispatch(play({
            nowPlaying: {
                ...item,
                index: index
            },
            playlist: results,
        }))
    }

    useEffect(() => {
        const songRef = collection(db, 'Song');
        const songQuery = query(songRef, where('name', '>=', keyword), where('name', '<=', keyword + '\uf8ff'))
        getDocs(songQuery)
            .then((snapshot) => {
                const song_list = snapshot.docs.map((doc) => {
                    return doc.data()
                })
                setResults(song_list)
            })

    }, [keyword])

    return (
        <ul className='result'>
            {
                results.map((item, index) => {
                    return (
                        <li className='result-item' key={index} onClick={() => handleClick(item, index)}>
                            <img className='song-img' src={item.img}></img>
                            <div className='song-info'>
                                <span className='song-name'>{item.name}</span>
                                <span className='song-author'>{item.artist}</span>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SearchResult;