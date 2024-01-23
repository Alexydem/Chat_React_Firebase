import { UseSelector, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { getAuth } from "../store/profile/selectors";

export const PublicRoute = ({ component }) => {
    const isAuth = useSelector(getAuth())
    if (isAuth) { return component }


}