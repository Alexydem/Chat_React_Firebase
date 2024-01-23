import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuth, getUserName } from '../../store/profile/selectors';
import { isAuth } from '../../store/profile/actions';

import './NavigationBar.css';

import { auth, logOut } from '../../services/firabase';





export function NavigationBar(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const name = useSelector(getUserName)
    const userName = auth.currentUser ? auth.currentUser.displayName : null; //исправить на прописы их Апп


    const getAuth = useSelector(selectAuth)

    const handleLognUp = () => {
        navigate('/signup')
    }
    const handleLogIn = () => {
        navigate('/signin')
    }
    const handleLogOut = async () => {
        await logOut()
        console.log("ВЫ ВЫШЛИ")
        dispatch(isAuth(false))
    }






    return (
        <>
            <nav>
                <div className="navBar">

                    {getAuth && (<NavLink
                        to="/"
                        className="title"
                        style={({ isActive }) => ({
                            color: isActive ? "green" : "lightgrey"
                        })}
                    > CHATS
                    </NavLink>)}

                    {/* {getAuth && (<NavLink
                        to="/account"
                        className="title"
                        style={({ isActive }) => ({
                            color: isActive ? "green" : "lightgrey"
                        })}
                    >ACCOUNT
                    </NavLink>)} */}

                    {/* <NavLink
                        to="/apiTest"
                        className="title"
                        style={({ isActive }) => ({
                            color: isActive ? "green" : "lightgrey"
                        })}
                    >API TEST
                    </NavLink> */}

                    <div className="signInBox">
                        {!getAuth && (
                            <div className="loginButtons">
                                <button className="logInButton" onClick={handleLogIn}>SIGN IN</button>
                                <button className="logInButton" onClick={handleLognUp}>SIGN UP</button>
                            </div>
                        )}
                        {getAuth && (
                            <>
                                {getAuth && (
                                    <NavLink
                                        to={`/account/${userName}`}
                                        className="title userName"
                                        style={({ isActive }) => ({
                                            color: isActive ? "green" : "lightgrey"
                                        })}>

                                        {userName}
                                    </NavLink>)
                                }
                                <button className="logInButton" onClick={handleLogOut}>LOG OUT</button>
                            </>
                        )}
                    </div>

                </div >
            </nav>

            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </>
    );
}