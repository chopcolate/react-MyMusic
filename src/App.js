import './App.css';
import firebaseConfig from './Firebase'
import firebase from 'firebase/compat/app'
import { useState, createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import SideBar from './Components/SideBar/SideBar';
import NavBar from './Components/NavBar/NavBar';
import Music from './Components/MusicPlayer/Music'
import { Home, Library, Search } from './Pages'
import { Login, SignUp } from './Features/Authentication/index'


function App() {


  firebase.initializeApp(firebaseConfig)

  const init = useSelector(state => state.player).nowPlaying
  const [playing, setPlaying] = useState(init)

  useEffect(() => {
      setPlaying(init)
  }, [init])

  return (
    
      <div className="wrapper">

        <SideBar />

        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/library" element={<Library />}></Route>

          <Route path='/register' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>

        {playing.img && <Music />}

      </div>
   
  )
}

export default App;
