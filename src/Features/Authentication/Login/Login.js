import { useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { log } from '../../../actions/actions'
import './Login.css'

function Login() {

    const navigate = useNavigate();

    const username = useRef();
    const password = useRef();
    const state = useRef();

    const db = getFirestore();

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const info = {
            username: username.current.value,
            password: password.current.value
        }

        const accRef = collection(db, 'Account');

        const reply = query(accRef, where('login', '==', info))

        getDocs(reply)
            .then((snapshot) => {
                if (snapshot.docs?.length) {
                    const payload = {
                        isLogged: true,
                        username: info.username,
                        userID: snapshot.docs[0].id
                    }
                    state.current.value = "Good"
                    state.current.style.color = "green"
                    dispatch(log(payload));
                    navigate('/')
                }
                else {
                    state.current.value = "Username or password is invalid."
                    state.current.style.color = "red"
                }
            })
    }

    return (
        <div className="Authentication">
            <div className="type">
                <NavLink className="type-Btn" to="/login">Sign In</NavLink>
                <NavLink className="type-Btn" to="/register">Sign Up</NavLink>
            </div>

            <div className="Authentication-input">
                <h4>Email address or username</h4>
                <input ref={username} type="text" placeholder="Email address or username"></input>

                <h4>Password</h4>
                <input ref={password} type="password" placeholder="Password"></input>

                <label htmlFor="notify">State: </label>
                <input ref={state} defaultValue="Good" className="notify" readOnly/>
            </div>

            <button className="login-btn" onClick={() => handleSubmit()}>LOG IN</button>
        </div>

    )
}

export default Login;
