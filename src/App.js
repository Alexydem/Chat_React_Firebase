import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { NavigationBar } from "./components/navBar/NavigationBar";
import { PageChat } from "./pages/chat/PageChat";
import { PageAccount } from "./pages/account/PageAccount"
// import { PageAPItest } from "./pages/APItest/PageAPItest"
import { PageSignIn } from './pages/singIn/PageSignIn'
import { PageSignUp } from './pages/signUp/PageSignUp'
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";

import { isAuth } from "./store/profile/actions";
import { PrivateRoute } from "./utils/PrivateRoute"

import { onValue } from "firebase/database";
import { auth, chatsRef } from "../src/services/firabase";

export function App() {
    const dispatch = useDispatch()

    //записываем данные зашедшего ЮЗЕРА
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('')
    const [chatsDB, setChatsDB] = useState({})
    const [chatsArray, setChatsArray] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(isAuth(true));
                setUser(user);
                setUserName(user.displayName)
                console.log('ПРИЛОЖЕНИЕ ЗАПУЩЕНО, ПОЛЬЗОВАТЕЛЬ-', user.displayName)
                onValue(chatsRef, (snapshot) => {
                    const data = snapshot.val();
                    const chatsArray = data ? Object.values(data) : [];
                    setChatsArray(chatsArray);
                    setChatsDB(data);
                });

            } else {
                dispatch(isAuth(false));
                setUser(null);
            }

        });




    }, []);  // Пустой массив зависимостей означает, что эффект сработает только при монтировании и размонтировании




    return (
        <>
            <Routes>
                <Route path="/" element={<NavigationBar user={user} />}>
                    <Route index element={<PrivateRoute><PageChat chatsDB={chatsDB} chatsArray={chatsArray} userName={userName} /></PrivateRoute>} />
                    <Route path="chat/:chatId" element={<PrivateRoute><PageChat chatsDB={chatsDB} chatsArray={chatsArray} userName={userName} /></PrivateRoute>} />
                    <Route path="/account/:userName" element={<PrivateRoute><PageAccount user={user} userName={userName} /></PrivateRoute>} />
                    <Route path="/signIn" element={<PageSignIn />} />
                    <Route path="/signUp" element={<PageSignUp />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
            <Outlet />
        </>
    );
}
