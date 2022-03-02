import { NavLink } from 'react-router-dom'

import { FaHome, FaSearch } from "react-icons/fa";
import { VscLibrary } from "react-icons/vsc"

import imgSrc from '../../assets/img/logo.png'
import './SideBar.css'

function SideBar() {

    return (
        <div className="side-bar">
            <img src={imgSrc} width="100%"></img>

            <NavLink to='/' className="nav-item"> 
                <FaHome className="nav-btn" /> 
                <p>Home</p> 
            </NavLink>

            <NavLink to='/search' className="nav-item"> 
                <FaSearch className="nav-btn"/>
                <p>Search</p>
            </NavLink>

            <NavLink to='/library' className="nav-item"> 
                <VscLibrary className="nav-btn"/> 
                <p>Your Library</p>
            </NavLink>
        </div>
    )
}

export default SideBar