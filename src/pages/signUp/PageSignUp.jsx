import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../store/articles/action";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ref, push, set, update } from "firebase/database"
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { db, auth, signUp, userRef, firebaseUser, getUserById } from "../../services/firabase";




export function PageSignUp() {

    const [inputs, setInputs] = useState({ email: '', password: '', name: '' })
    const [error, setError] = useState('')
    const [isRegSucces, setIsRegSucces] = useState(false)
    const [personalInfo, setPersonalInfo] = useState(false)
    const [user, setUser] = useState(null);

    const auth = getAuth();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('а вот у него должны поменять имя', user.uid)
                // Пользователь вошел в систему
                setUser(user);
            } else {
                // Пользователь вышел из системы
                setUser(null);
            }
        });
        // Отписываемся от слушателя при размонтировании компонента
        return () => unsubscribe();
    }, [user]);


    //достаем статус загрузки из стора
    const loading = useSelector((state) => state.articles.loading)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //вытаскивает из таргета имя данного инпута и его значение
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






    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(setLoading(true));

        try {
            const userCredential = await signUp(inputs.email, inputs.password);
            console.log('ВЫ ЗАРЕГАЛИСЬ');

            setIsRegSucces(true);
            setTimeout(() => {
                setIsRegSucces(false);
            }, 1000);

            ////////////////////////////
            ////////////////////////////////////////////////////////
            ////////////////////////////
            ////////////////////////////
            ////////////////////////////
            ////////////////////////////
            ////////////////////////////  ВОТ ГДЕ ЖЕСТКИЙ КОСЯК
            ////////////////////////////  КОГДА РЕГАЮСЬ, ТО СРАЗУ ПОЧЕМУ ТО ВХОДИТ В СИСТЕМУ ЕЩЕ ДО ЛОГИНА
            ////////////////////////////  А ЕСЛИ УБЕРУ const user = userCredential.user;    
            ////////////////////////////  ОШИБОК ПРИ ЛОГИНЕ НЕ БУДЕТ, НО НЕ БУДЕТ ЮЗЕРА В СИСТЕМЕ
            ////////////////////////////
            //так мы получили объект зарегестрированного юзера
            const user = userCredential.user;
            setUser(user)

            await updateProfile(user, {
                displayName: inputs.email.match(/^[^@]*/)[0]
            });


            //так мы закинули его информацию в БД
            update(userRef, {
                [user.uid]: {
                    email: inputs.email,
                    password: inputs.password,
                    displayName: inputs.email.match(/^[^@]*/)[0],
                    uid: user.uid, // Добавляем UID в базу данных
                }
            });

            console.log('ЭТО НАШ НОВЫЙ ЮЗЕР с uid -', user.uid)
            console.log('У НОВОГО ЮЗЕРА В БД ИМЯ -', inputs.email)

            setPersonalInfo(true);
            navigate('/signIn');
        } catch (error) {
            setError(error.message);
        } finally {
            setInputs({ email: '', password: '' });
            dispatch(setLoading(false));
        }
    }



    return (
        <>

            <div className="signin-container">
                <h2>РЕГИСТРАЦИЯ</h2>
                <form
                    onSubmit={handleSubmit}
                    className="signin-form"
                    id="signInForm">
                    <label className="signin-label">
                        Enter Email:
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
                    >Enter Password:
                    </label>
                    <input
                        className="signin-input"
                        type="password"
                        autoComplete="password"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                        required />
                    {loading && (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {isRegSucces && (
                        <p style={{ color: 'GREEN' }}>УСПЕШНАЯ РЕГИСТРАЦИЯ</p>
                    )}
                    <button
                        className="signin-button"
                        type="submit">
                        SIGN UP
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div >


        </>
    )
}


