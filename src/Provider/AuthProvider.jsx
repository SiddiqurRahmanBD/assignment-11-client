import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';

import { AuthContext } from "./AuthContext";
import useAxios from "../Hooks/useAxios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] =useState('');
  const [userStatus, setUserStatus] = useState('');
  const axiosInstance = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const forgetPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() =>{
    if(!user) return
    axiosInstance.get(`/users/role/${user.email}`)
    .then(res => {
      setRole(res.data.role)
      setUserStatus(res.data.status)
      setRoleLoading(false)
    })
    
  },[axiosInstance, user])

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    logout,
    loading,
    setLoading,
    updateUser,
    googleSignIn,
    forgetPass,
    role,
    roleLoading,
    userStatus
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
