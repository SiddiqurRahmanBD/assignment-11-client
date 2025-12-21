import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router";


import { AuthContext } from "../Provider/AuthContext";
import LoaderSpinner from "../Components/Shared/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  // console.log({user, userStatus, roleLoading, loading});
  const location = useLocation();
  if (loading || roleLoading) {
    return <LoaderSpinner/>
  }
 
  if (!user  || !userStatus === "Active"  ) {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
