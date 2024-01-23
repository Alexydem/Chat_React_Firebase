import { useState, useEffect } from 'react'
import "../account/PageAccount.css"
import { useSelector, useDispatch } from "react-redux";
import { getUserName } from '../../store/profile/selectors'

import * as types from '../../store/profile/types'
import { changeName } from '../../store/profile/actions'

import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { set, update } from "firebase/database"
import { db, auth, signUp, userRef, firebaseUser, getUserById } from "../../services/firabase";


export function PageAccount({ userName, user }) {

  // console.log('ЭТОТ АККАУНТ', user.uid)
  const dispatch = useDispatch()

  // const name = useSelector(getUserName)

  //узнать зачем мы эту валуе создавали а не просто брали из ончейндж
  const [value, setValue] = useState(userName)

  // console.log('getUserById', getUserById)



  const handleChangeName = () => {
    setValue(value)
    if (value !== "") {
      // dispatch(changeName(value))
      updateProfile(user, {
        displayName: value
      });

      update(getUserById(user.uid), {
        displayName: value
      });



    }
  }







  return (
    <>
      <div
        className="pageAccount">
        <h1>Page Account</h1>
        <hr />
        <h3 className='accountName'>
          Имя пользователя: {userName}
        </h3>
        <input
          type="text"
          placeholder="Write new name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={handleChangeName}
        >Change name</button>
      </div>

    </>
  );
}