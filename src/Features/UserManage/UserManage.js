import './UserManage.css'
import { useDispatch } from 'react-redux';
import { log } from '../../actions/actions'


function UserManage() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(log({
            isLogged: false,
            username: ''
        }))
        
    }

    return (
        <div className="user-option">
            <p onClick={() => handleLogout()}>Logout</p>
        </div>
    )
}

export default UserManage;