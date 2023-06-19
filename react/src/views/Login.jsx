
import { Link } from 'react-router-dom';
import React, {useRef} from 'react';
import axiosClient from "../axios-client.js";
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
  const{setUser,setToken} = useStateContext();
  const [errors, setErrors] = React.useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
          email :  emailRef.current.value ,
          password : passwordRef.current.value ,
      }
      setErrors(null);
      axiosClient.post('/login',payload).then(({data})=>{
        setUser(data.user);
        setToken(data.token);
        }).catch(err => {
        // debugger;
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.error) {
            setErrors(response.data.errors)
          } else {
            setErrors(
              {email: [response.data.message], }
            )
          }
          // console.log();

        }
      })

    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className='title'>Login into your account</h1>
                  {errors && <div className="alert">{Object.keys(errors).map(key => <p key={key} >{errors[key][0]}</p>)} </div>}
                    <input ref = {emailRef} type="email" placeholder="Email" />
                    <input ref = {passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">Not Registered?
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}