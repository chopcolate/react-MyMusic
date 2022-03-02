import { getDocs, getDoc, query, where, getFirestore, collection, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { play } from '../../actions/actions'
import './Favorite.css'



function Favorite() {

    const logged = useSelector(state => state.logged);
    const [favList, setFavList] = useState([])
    const dispatch = useDispatch();

    const db = getFirestore();
    const accRef = collection(db, 'Account')
    const favSong = doc(accRef, logged.userID)

    const handleClick = (item, index) => {
        dispatch(play({
            nowPlaying: {
                ...item,
                index: index
            },
            playlist: favList,
        }))
    }

    useEffect(() => {

        getDoc(favSong)
            .then((snapshot) => {
                snapshot.data().fav.forEach((item) => {
                    getDoc(doc(db, 'Song', item))
                        .then((res) => {
                            setFavList((prev) => {
                                return [
                                    ...prev,
                                    res.data()
                                ]
                            });
                        })
                })
            })
    }, [])


    return (
            <ul className="fav">
                {
                    favList.map((item, index) => {
                        return (
                            <li className='fav-item' key={index} onClick={() => handleClick(item, index)}>
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


export default Favorite;