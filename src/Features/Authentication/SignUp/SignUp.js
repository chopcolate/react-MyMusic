import { useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { log } from '../../../actions/actions'
import './SignUp.css'


function SignUp() {

    const navigate = useNavigate();

    const username = useRef();
    const password = useRef();
    const state = useRef();

    const db = getFirestore();

    const handleSubmit = () => {
        const info = {
            username: username.current.value,
            password: password.current.value
        }

        const accRef = collection(db, 'Account');

        const reply = query(accRef, where('login.username', '==', info.username))

        getDocs(reply)
            .then((snapshot) => {
                if (!snapshot.docs?.length) {
                    state.current.value = "Good"
                    state.current.style.color = "Green"
                    addDoc(accRef, {
                        login: {
                            username: info.username,
                            password: info.password
                        }
                    })
                    .then(() => {
                        alert('Sign up successful! Please login again.')
                        navigate('/login')
                    })
                }
                else {
                    state.current.value = "Username duplicated"
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
                <h4>What's your username ?</h4>
                <input ref={username} type="text" placeholder="Email address or username"></input>
                <h4>Create a password</h4>
                <input ref={password} type="password" placeholder="Password"></input>
                <label htmlFor="notify">State: </label>
                <input ref={state} defaultValue="Good" className="notify" readOnly />
            </div>
            <button className="login-btn" onClick={() => handleSubmit()}>SIGN UP</button>
        </div>
    )
}

export default SignUp;