import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { isAuth } from "../../store/profile/actions";
import { setLoading } from "../../store/articles/action";

import { signIn } from "../../services/firabase";

import "../singIn/PageSignIn.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export function PageSignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isRegSucces, setIsRegSucces] = useState(false)
    const [inputs, setInputs] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    //достаем статус загрузки из стора
    const loading = useSelector((state) => state.articles.loading)

    //вытаскивает из евента имя конкретного инпута и его значение
    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        //берет предыдущее состояние состояния и заменяет в нем [имя]=ключ   и   валуе=значение
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        })
        )
    }

    //аутендификация
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        dispatch(setLoading(true))
        try {
            await signIn(inputs.email, inputs.password)
            setIsRegSucces(true)
            dispatch(isAuth(true))
            navigate('/')
            setIsRegSucces(false)
            setInputs({ email: '', password: '' });

        } catch (error) {
            setError(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }




    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form
                onSubmit={handleSubmit}
                className="signin-form"
                id="signInForm">
                <label className="signin-label">
                    Email:
                </label>
                <input
                    className="signin-input"
                    type="email"
                    id="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required />
                <label
                    className="signin-label"
                >Password:
                </label>
                <input
                    className="signin-input"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required />
                {loading && (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                )}
                {isRegSucces && (
                    <p style={{ color: 'GREEN' }}>ВЫ ВОШЛИ</p>
                )}
                <button
                    className="signin-button"
                    type="submit">
                    Sign In
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div >
    )
}



