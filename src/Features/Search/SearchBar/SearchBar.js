import { useDispatch } from 'react-redux';
import { search } from '../../../actions/actions'

import { IoSearchOutline ,IoCloseOutline } from 'react-icons/io5'
import './SearchBar.css'


function SearchBar() {

    const dispatch = useDispatch();

    const handleKeyword = (e) => {
        dispatch(search(e.target.value))
    }


    return (
        <div className="nav-search">
            <IoSearchOutline className="icon" />

            <input className="search-input"
                placeholder="Artists, songs or podcasts"
                onInput={(e) => handleKeyword(e)}></input>

            <IoCloseOutline className="icon" />
        </div>
    )
}

export default SearchBar;