import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { useForm } from 'react-hook-form';
import { useSession } from '../hooks/useSession';
import { handleFocus } from '../utils/handleFocus';
import { LeftArrow } from '../components/svg/LeftArrow';

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [session] = useSession();

    const onSubmit = (data: any) => {
        // post data to backend
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((data: LoginResponse) => {
            // redirect to home page
            // save session in cookie
            document.cookie = `session=${data.token}; path=/`;
            // save user in cookie
            document.cookie = `user=${JSON.stringify(
                {
                    name: data.user.name,
                    surname: data.user.surname,
                    username: data.user.username,
                    email: data.user.email,
                    picture: data.user.picture.fileName,
                    createdAt: data.user.createdAt,
                }
            )}; path=/`;
            navigate('/');
        }
        ).catch((error) => {
            console.log(error);
            setError(true);
        });

    }

    return (
        <div className="container-wrapper">
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
                                navigate('/register');
                            }
                        } className="js-form-btn">Register</button>

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
        </div>
    );
}
