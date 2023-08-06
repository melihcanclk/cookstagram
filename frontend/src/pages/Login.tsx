import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { useForm } from 'react-hook-form';
import { useSession } from '../hooks/useCookie';

type Response = {
    message: string,
    user: UserType,
    token: string,
}

type UserType = {
    username: string,
    email: string,
    picture: {
        fileName: string,
    },
    createdAt: string,
    token: string,
}


export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [session] = useSession();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.value = '';
    }

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
                console.log('Error!');
                throw new Error('Something went wrong');
            }
        }).then((data: Response) => {
            // redirect to home page
            // save session in cookie
            document.cookie = `session=${data.token}; path=/`;
            // save user in cookie
            document.cookie = `user=${JSON.stringify(
                {
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

    if (session) {
        navigate('/');
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
                <button type="submit" className="js-form-btn">Submit</button>
                {
                    error && <span className="error-msg">Invalid username or password</span>
                }
            </form>
        </div>
    );
}
