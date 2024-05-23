import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, roleName }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roleStatus, setRoleStatus] = useState(false); // Default to false
  const [roleCheckComplete, setRoleCheckComplete] = useState(false); // Track if role check is complete

  useEffect(() => {
    axios.get("http://localhost:5000/isAuthenticated", { withCredentials: true })
      .then(response => {
        setIsAuthenticated(response.data.status);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      });

    const checkRole = () => {
      axios.post("http://localhost:5000/checkRole", { roleName: roleName }, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          setRoleStatus(response.data.status);
          setRoleCheckComplete(true);
        })
        .catch(error => {
          console.error("Error checking role:", error);
          setRoleCheckComplete(true); 
        });
    }

    checkRole();
  }, [roleName]);

  if (isLoading || !roleCheckComplete) {
    return <div>Loading...</div>;
  }

  if(isAuthenticated && !roleStatus){
    return <Navigate to={"/notFound"} />;
  }

  if (!isAuthenticated || !roleStatus) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
