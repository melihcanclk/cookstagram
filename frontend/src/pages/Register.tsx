import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { handleFocus } from '../utils/handleFocus';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useCookie';
import { LeftArrow } from '../components/svg/LeftArrow';

export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const [session] = useSession();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
    }

    return (
        <div className="container">
            <div className="container-msg-modal">
                <div className="container-modal-content--success container-modal-content">
                    <span>Welcome!</span>
                </div>
                <div className="container-modal-content--error container-modal-content"><span>Failed Login</span></div>
            </div>

            <form onSubmit={
                handleSubmit(onSubmit)
            }
                id='form'
            >
                <div className="container-form-userName container-form-input">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                </div>
                {errors.username && <span className="error-msg">This field is required</span>}

                <div className="container-form-userPassword container-form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" onFocus={handleFocus} required
                        {...register("password", { required: true })}
                    />
                </div>
                <div className='button-container'>
                    <button type="button" onClick={
                        () => {
                            navigate('/login');
                        }
                    } className="js-form-btn">Login</button>

                    <button type="submit" className="js-form-btn">Submit</button>
                </div>
                {
                    error && <span className="error-msg">Invalid username or password</span>
                }

                <div className="info-msg-container">
                    {
                        session && <span className="
                        info-msg
                    ">
                            <a href="/"><LeftArrow height='24px' width='24px' /></a>
                            You are already logged in</span>
                    }
                </div>
            </form>
        </div>
    )
}
