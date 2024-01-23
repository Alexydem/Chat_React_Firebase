import { Navigate, } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAuth } from "../store/profile/selectors";





export const PrivateRoute = ({ children }) => {
    const isAuth = useSelector(selectAuth)
    return isAuth ? children : <Navigate to="/signIn" />

}