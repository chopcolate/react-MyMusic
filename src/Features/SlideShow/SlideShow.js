import { useContext, useEffect, useState, useRef } from 'react'
import Slider from "react-slick";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'

import { useDispatch } from 'react-redux';

import { play } from '../../actions/actions'
import './SlideShow.css'

function SlideShow() {
    const settings = {
        infinite: true,
        speed: 1200,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        variableWidth: true,
        pauseOnHover: false
    };

    const [slides, setSlides] = useState([])

    const db = getFirestore();
    const slideRef = collection(db, 'SlideShow')

    const dispatch = useDispatch();

    useEffect(() => {
        let arr = []
        getDocs(slideRef)
            .then((snapshot) => {
                arr = snapshot.docs.map((doc) => {
                    return doc.data().song_id
                })

                return arr;
            })
            .then((arr) => {
                arr.forEach((item) => {
                    getDoc(doc(db, 'Song', item))
                        .then((snapshot) => {
                            setSlides((prev) => {
                                return [
                                    ...prev,
                                    snapshot.data()
                                ]
                            });
                        })
                })
            })
    }, [])

    /*Code thuần
    useEffect(() => {
        let index = 0;
        setInterval(() => {
            const sRef = document.querySelectorAll('.Slide')
            sRef[0].style.marginLeft = `calc(-32%*${index})`;
            index == sRef.length - 3 ? index = 0 : index++;
        }, 5000)

    }, [])*/

    const handleSlideClick = (slide, index) => {
        dispatch(play({
            nowPlaying: {
                ...slide,
                index: index
            },
            playlist: slides
        }))
    }

    if (slides.length == 0) {
        return null;
    }
    return (
        <>
            <h2>For You</h2>
            <div className="SlideShow">
                <Slider {...settings}>
                    {
                        slides.map((slide, index) => 
                        <div className="Slide" key={index} onClick={() => { handleSlideClick(slide, index) }}>
                            <img src={slide.img}></img>
                        </div>)
                    }
                </Slider>
            </div>

        </>

    )
}

export default SlideShow;