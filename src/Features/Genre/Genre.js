import './Genre.css'

import { getDocs, getDoc, collection, doc, getFirestore } from 'firebase/firestore'
import { useState, useEffect } from 'react'

function Genre() {
    const db = getFirestore();
    const [genres, setGenres] = useState([])
    const genreRef = collection(db, 'TopGenre')
    useEffect(() => {
        getDocs(genreRef)
            .then((snapshot) => {
                snapshot.docs.map((doc) => {
                    setGenres((prev) => {
                        return [
                            ...prev,
                            doc.data()
                        ]
                    })
                })
            })
    }, [])
    

    return (
        <>
            <h2>Top Genre</h2>
            <ul className="Genres">
                {
                    genres.map((genre, index) => <li className="Genre" key={index}><img src={genre.path}></img></li>)
                }
            </ul>
        </>
    )
}

export default Genre;