import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import LoaderSpinner from "../Components/LoaderSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return <LoaderSpinner/>
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
