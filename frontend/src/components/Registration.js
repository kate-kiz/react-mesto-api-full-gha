
import { useState } from 'react';
import { Link } from 'react-router-dom'; //убрала useNavigate

function Registration({ onRegister }) {
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = formValues;
        onRegister({ email, password });

    }

    return (
        <div className='auth'>
            <h1 className='auth__title'>Регистрация</h1>
            <form className='auth__form'
                onSubmit={handleSubmit}>
                <input
                    name='email'
                    type="email"
                    onChange={handleChange}
                    value={formValues.email}
                    className='auth__input'
                    placeholder='E-mail'

                />
                <input
                    name='password'
                    type="password"
                    onChange={handleChange}
                    value={formValues.password}
                    className='auth__input'
                    placeholder='Пароль'
                    required
                />
                <button
                    type="submit"
                    className='auth__button'
                >
                    Зарегистрироваться
                </button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <span>
                    <Link to='/sign-in' className='auth__link' href="#">Войти</Link>
                </span></p>
        </div>
    );
}

export default Registration;

// import AuthorizationPopup from "./AuthorizationPopup";

// function Registration({ onRegister }) {

//     return (
//         <AuthorizationPopup
//             title='Регистрация'
//             buttonText='Зарегистрироваться'
//             linkText='Уже зарегистрированы? Войти'
//             linkPath='/sign-in'
//             onSubmit={onRegister}
//         />
//     )
// }

// export default Registration; 
