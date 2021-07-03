import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const LoginPage = (props) => {
    const history = useHistory();
    const [ususario, setususario] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setususario({ ...ususario, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(ususario)
        // props.login(ususario)
    }
    const login = async (user) => {
        const requestOptions = {
            method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:4000/api/login', requestOptions);
        const data = await response.json();
        window.localStorage.setItem('user',JSON.stringify(data));
        history.push("/dashboard");
    }
return (
    <div className="container mainlogin">
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleInputChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={handleInputChange} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit">Submit</button>
            <p className="forgot-password text-right">
                Forgot password?
            </p>
            <Link className="link" to="/registro">Registrate!</Link>
        </form>
    </div>
);
}
export default LoginPage;