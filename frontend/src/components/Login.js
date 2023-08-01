
import { useState } from "react";

function Login({ onLogin }) {

    const [formValues, setFormValues] = useState({ email: '', password: '' })

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = formValues;
        onLogin(email, password);
    }

    return (
        <div className='auth'>

            <h1 className='auth__title'>Вход</h1>
            <form
                className='auth__form auth__form_login'
                onSubmit={handleSubmit}
            >
                <div className="auth__section">
                    <input
                        type="email"
                        name='email'
                        value={formValues.email}
                        onChange={handleChange}
                        className='auth__input'
                        placeholder='E-mail'
                        required
                    />
                    <span className="auth__error" id="input-error-email" />
                </div>
                <div className="auth__section">
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        className='auth__input'
                        placeholder='Пароль'
                        required
                    />
                    <span className="auth__error" id="input-error-password" />
                </div>
                <button
                    type="submit"
                    className='auth__button'>
                    Войти
                </button>
            </form>


        </div>
    );

}

export default Login;

// import AuthorizationPopup from "./AuthorizationPopup";

// function Login({ onLogin }) {
//     return (
//         <AuthorizationPopup
//             title='Вход'
//             buttonText='Войти'
//             linkText='Нет аккаунта? Создать'
//             linkPath='/sign-up'
//             onSubmit={onLogin}
//         />
//     )
// }

// export default Login;
