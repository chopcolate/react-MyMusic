import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'

import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { search } from '../../actions/actions'

import SearchBar from '../../Features/Search/SearchBar/SearchBar'
import UserManage from '../../Features/UserManage/UserManage'
import './NavBar.css'


function NavBar() {
    const location = useLocation();
    const [path, setPath] = useState(window.location.pathname);
    const [option, setOption] = useState(false)
    const logged = useSelector(state => state.logged)
    const [isLogged, setIsLogged] = useState(logged.isLogged)


    const handleUserOption = () => {
        setOption(!option)
    }

    useEffect(() => {

        location.pathname == '/search' ? setPath(true) : setPath(false)
        
    }, [location])

    useEffect(() => {
        setIsLogged(logged.isLogged)
        setOption(false)
    }, [logged])

    return (
        <div className="nav">
            <div className="nav-btn">
                <MdNavigateBefore className="btn" />
                <MdNavigateNext className="btn" />
            </div>

            {path && <SearchBar />}
            
            <div className="nav-login">
                {!isLogged && <NavLink className="signup" to="/register">SIGN UP</NavLink>}
                {!isLogged && <NavLink className="login" to="login">LOG IN</NavLink>}
                {isLogged && <p className="account">Hello {logged.username}</p>}
                {isLogged && <IoIosArrowDown className="user-option-btn" onClick={() => handleUserOption()} />}
                {option && <UserManage onFocusOut={() => setOption(false)} />}
            </div>
            
        </div>
    )
}

export default NavBar;