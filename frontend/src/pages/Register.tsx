import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useCookie';
import { LeftArrow } from '../components/svg/LeftArrow';
import { FormFieldError } from '../components/error/FormFieldErrors';
import Dropzone from '../components/Dropzone';

export const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [session] = useSession();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        // create FormData object
        const formData = new FormData();
        // append data to FormData object
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);

        // send FormData object to server
        fetch('http://localhost:3000/register', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error(error);
            })

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
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                </div>
                {
                    FormFieldError({ errors, fieldname: 'name', placeholder: 'Name' })
                }

                <div className="container-form-userName container-form-input">
                    <label htmlFor="surname">Surname</label>
                    <input
                        id="surname"
                        placeholder="Surname"
                        {...register("surname", { required: true })}
                    />
                </div>
                {FormFieldError({ errors, fieldname: 'surname', placeholder: 'Surname' })}

                < div className="container-form-userName container-form-input">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                </div>
                {FormFieldError({ errors, fieldname: 'username', placeholder: 'Username' })}

                <div className="container-form-userName container-form-input">
                    <label htmlFor="username">Email</label>
                    <input
                        id="email"
                        placeholder="Email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Invalid email pattern"
                            },
                            required: true
                        })}
                    />
                </div>
                {FormFieldError({ errors, fieldname: 'email', placeholder: 'Email' })}

                < div className="container-form-userPassword container-form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password"
                        {...register("password", { required: true, minLength: 6 })}
                    />
                </div>

                {FormFieldError({ errors, fieldname: 'password', placeholder: 'Password', min: 6 })}
                <div className="container-form-userPassword container-form-input">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password"
                        {...register("confirm_password", {
                            required: true,
                            minLength: 6,
                            validate: (value) => value === watch('password')
                        })}
                    />
                </div>
                {FormFieldError({ errors, fieldname: 'confirm_password', placeholder: 'Confirm Password', min: 6, validate: true })}

                <Dropzone />
                <div className='button-container'>
                    <button type="button" onClick={
                        () => {
                            navigate('/login');
                        }
                    } className="js-form-btn">Login</button>

                    <button type="submit" className="js-form-btn">Submit</button>
                </div>

                <div className="info-msg-container">
                    {
                        session && <span className="
                        info-msg
                    ">
                            <a href="/"><LeftArrow height='24px' width='24px' /></a>
                            You are already logged in</span>
                    }
                </div>
            </form >
        </div >
    )
}
