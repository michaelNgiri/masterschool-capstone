import React, { useState } from 'react';
import { formdata } from "../../types";
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/auth.service';
import { saveToken } from '../../utils';

const Login = () => {
    const [formdata, setFormData] = useState<formdata>({
        username: '',
        email: '',
        password: ''
    })
    const [submiting, setSubmiting] = useState(false);
    let navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formdata,
            [name]: value
        })
    };

    const handleSubmit = () => {
        setSubmiting(true)
        if (formdata.email && formdata.password && formdata.username) {
            signIn(formdata)
                .then((res) => {
                    return res.data
                }).then((respo) => {
                    if (respo.accessToken) {
                        console.log(respo, 'respo');
                        saveToken(respo.accessToken)
                        navigate("/");
                    } else {
                        setSubmiting(false)
                    }
                })


        } else {
            alert('Please fill out all fields(username, email, password)');
        }
    };
    return (
        <div className='todo-body'>
            <h5 className='form-header'>Login to enjoy app</h5>

            <div className='text-center bg-transparent'>
                <input type="text" placeholder="username" name='username' value={formdata.username} onChange={onChange} className="input-auth" />
                <input type="email" placeholder="email" name='email' value={formdata.email} onChange={onChange} className="input-auth" />
                <input type="password" placeholder="*******" name='password' value={formdata.password} onChange={onChange} className="input-auth" />
                {/* <div className=''> */}
                <button className='form-submit-btn' type='submit' onClick={() => handleSubmit()}>{submiting ? 'Submiting' : 'Submit'}</button>
                {/* </div> */}
                <span>New user?   <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>register</Link></span>
            </div>
        </div>
    )
}

export default Login