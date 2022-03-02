import './Artist.css'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';



function Artist() {
    const db = getFirestore();
    const artistRef = collection(db, 'Artist')
    const [artists, setArtists] = useState([])
    useEffect(() => {
        getDocs(artistRef)
            .then((snapshot) => {
                snapshot.docs.map(doc => {
                    setArtists((prev) => [
                        ...prev,
                        doc.data()
                    ])
                })
            })
    }, [])


    return (
        <>
            <h2>Artist</h2>

            <ul className="Artists">
                {
                    artists.map((artist, index) => {
                        return (

                            <li className="Artist" key={index}>
                                <div className="info">
                                    <img src={artist.path}></img>
                                    <p>This is {artist.name}</p>
                                </div>
                            </li>


                        )
                    })
                }
            </ul>

        </>
    )
}

export default Artist