import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase';
import { googleSignIn } from '../../features/user/authSlice';

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async() => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);
        const {displayName, email, photoURL} = result.user;
        dispatch(googleSignIn({username:displayName, email, avatar:photoURL}));
        
    } catch (error) {
        console.log("could not sign in with google", error);
    }   
}
  return (
    <button type='button' onClick={handleGoogleClick} style={{color:"white", backgroundColor:"#8B1B13"}}>Continue with Google</button>
  )
}

export default OAuth
